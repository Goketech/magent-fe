interface TwitterAuthConfig {
  clientId: string;
  clientSecret?: string; // Optional for public clients
  redirectUri: string;
  scopes: string[];
}

export class TwitterAuth {
  private config: TwitterAuthConfig;

  constructor(config: TwitterAuthConfig) {
    this.config = config;
  }

  // Generate a random code verifier for PKCE
  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 128);
  }

  // Generate code challenge from verifier
  private async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  // Generate the authorization URL
  public async getAuthUrl(): Promise<{
    url: string;
    state: string;
    codeVerifier: string;
  }> {
    const stateArray = new Uint8Array(16);
    crypto.getRandomValues(stateArray);
    const state = Array.from(stateArray, (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("");

    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(" "),
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    return {
      url: `https://x.com/i/oauth2/authorize?${params.toString()}`,
      state,
      codeVerifier,
    };
  }

  // Exchange authorization code for tokens
  public async getAccessToken(
    code: string,
    codeVerifier: string
  ): Promise<{
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  }> {
    if (!codeVerifier) {
      throw new Error(
        "Code verifier not found. Please generate an auth URL first."
      );
    }

    const params = new URLSearchParams({
      code,
      grant_type: "authorization_code",
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      code_verifier: codeVerifier,
    });

    const headers: HeadersInit = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // Add basic auth for confidential clients
    if (this.config.clientSecret) {
      const basicAuth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString("base64");
      headers["Authorization"] = `Basic ${basicAuth}`;
    }

    const response = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers,
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Refresh the access token
  public async refreshToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  }> {
    const params = new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      client_id: this.config.clientId,
    });

    const headers: HeadersInit = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    if (this.config.clientSecret) {
      const basicAuth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString("base64");
      headers["Authorization"] = `Basic ${basicAuth}`;
    }

    const response = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers,
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Revoke a token
  public async revokeToken(token: string): Promise<void> {
    const params = new URLSearchParams({
      token,
      client_id: this.config.clientId,
    });

    const headers: HeadersInit = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    if (this.config.clientSecret) {
      const basicAuth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString("base64");
      headers["Authorization"] = `Basic ${basicAuth}`;
    }

    const response = await fetch("https://api.x.com/2/oauth2/revoke", {
      method: "POST",
      headers,
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export const twitterAuth = new TwitterAuth({
  clientId: process.env.TWITTER_CLIENT_ID!,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL!,
  scopes: [
    "tweet.read",
    "tweet.write",
    "users.read",
    "follows.read",
    "follows.write",
  ],
});
