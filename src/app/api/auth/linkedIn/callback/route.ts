export const runtime = "edge";
import { NextRequest, NextResponse } from "next/server";
import { linkedInAuth } from "@/utils/linkedInAuth";

export async function POST(request: NextRequest){
  try {
    const { code, codeVerifier } = await request.json();
    console.log("Received code:", code);
    console.log("Received codeVerifier:", codeVerifier);

    const tokens =  await linkedInAuth.getAccessToken(code, codeVerifier);
    console.log("Received tokens:", tokens);

    return NextResponse.json(tokens);
  } catch (error) {
   console.error('Token exchange error:', error);
   return NextResponse.json(
     { error: 'Failed to exchange code for tokens' },
     { status: 500 }
   );
  }
}
