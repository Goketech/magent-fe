import { NextRequest, NextResponse } from 'next/server';
import { twitterAuth } from '@/utils/xAuth';
export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { code, codeVerifier } = await request.json();

    const tokens = await twitterAuth.getAccessToken(code, codeVerifier);

    // Return the tokens
    return NextResponse.json(tokens);

  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { error: 'Failed to exchange code for tokens' },
      { status: 500 }
    );
  }
}