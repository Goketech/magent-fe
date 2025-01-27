import { randomBytes, createHash } from 'crypto';

interface TwitterAuthConfig {
  clientId: string;
  clientSecret?: string; // Optional for public clients
  redirectUri: string;
  scopes: string[];
}

export class TwitterAuth {
  private config: TwitterAuthConfig;
  private codeVerifier: string | null = null;
  
  constructor(config: TwitterAuthConfig) {
    this.config = config;
  }

  // Generate a random code verifier for PKCE
  private generateCodeVerifier(): string {
    return randomBytes(32)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 128);
  }

  // Generate code challenge from verifier
  private generateCodeChallenge(verifier: string): string {
    return createHash('sha256')
      .update(verifier)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Generate the authorization URL
  public getAuthUrl(): { url: string; state: string } {
    const state = randomBytes(16).toString('hex');
    this.codeVerifier = this.generateCodeVerifier();
    const codeChallenge = this.generateCodeChallenge(this.codeVerifier);

    localStorage.setItem("twitter_oauth_state", state);
    localStorage.setItem("twitter_code_verifier", this.codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(' '),
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });

    return {
      url: `https://x.com/i/oauth2/authorize?${params.toString()}`,
      state
    };
  }

  // Exchange authorization code for tokens
  public async getAccessToken(code: string): Promise<{
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  }> {
    const codeVerifier = localStorage.getItem("twitter_code_verifier") || this.codeVerifier;
    if (!codeVerifier) {
        console.log(this.codeVerifier);
      throw new Error('Code verifier not found. Please generate an auth URL first.');
    }

    const params = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      code_verifier: this.codeVerifier!
    });

    const headers: HeadersInit = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    // Add basic auth for confidential clients
    if (this.config.clientSecret) {
      const basicAuth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString('base64');
      headers['Authorization'] = `Basic ${basicAuth}`;
    }

    const response = await fetch('https://api.x.com/2/oauth2/token', {
      method: 'POST',
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
      grant_type: 'refresh_token',
      client_id: this.config.clientId,
    });

    const headers: HeadersInit = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (this.config.clientSecret) {
      const basicAuth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString('base64');
      headers['Authorization'] = `Basic ${basicAuth}`;
    }

    const response = await fetch('https://api.x.com/2/oauth2/token', {
      method: 'POST',
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
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (this.config.clientSecret) {
      const basicAuth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString('base64');
      headers['Authorization'] = `Basic ${basicAuth}`;
    }

    const response = await fetch('https://api.x.com/2/oauth2/revoke', {
      method: 'POST',
      headers,
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export const twitterAuth = new TwitterAuth({
    clientId: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!,
    clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL!,
    scopes: [
      "tweet.read",
      "tweet.write",
      "users.read",
      "follows.read",
      "follows.write",
    ],
  });