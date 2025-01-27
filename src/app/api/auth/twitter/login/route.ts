import { NextRequest, NextResponse } from 'next/server';
import { twitterAuth } from '@/utils/xAuth';

export async function GET(request: NextRequest) {
  try {

    const response = twitterAuth.getAuthUrl();

    return NextResponse.json(response);

  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { error: 'Failed to exchange code for tokens' },
      { status: 500 }
    );
  }
}