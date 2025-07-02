interface LinkedInAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export class LinkedInAuth {
  private config: LinkedInAuthConfig;

  constructor(config: LinkedInAuthConfig) {
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

  // Generate LinkedIn authorization URL
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
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    return {
      url: `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`,
      state,
      codeVerifier,
    };
  }

  // Exchange authorization code for access token
  public async getAccessToken(
    code: string,
    codeVerifier: string
  ): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  }> {
    if (!codeVerifier) {
      throw new Error(
        "Code verifier not found. Please generate an auth URL first."
      );
    }

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: this.config.redirectUri,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code_verifier: codeVerifier,
    });

    console.log(
      "Fetching token from:",
      "https://www.linkedin.com/oauth/v2/accessToken"
    );

    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    return response.json();
  }

  // Refresh an expired access token
  public async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  }> {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    });

    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to refresh access token: ${response.statusText}`);
    }

    return response.json();
  }

  // Revoke an access token
  public async revokeAccessToken(accessToken: string): Promise<boolean> {
    const params = new URLSearchParams({
      token: accessToken,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    });

    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to revoke access token: ${response.statusText}`);
    }

    return true;
  }
}

export const linkedInAuth = new LinkedInAuth({
  clientId: process.env.LINKEDIN_CLIENT_ID!,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  redirectUri: process.env.LINKEDIN_REDIRECT_URI!,
  scopes: ["r_liteprofile", "r_emailaddress", "w_member_social"],
});
