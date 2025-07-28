export const runtime = "edge";
import { NextRequest, NextResponse } from "next/server";
import { linkedInAuth } from "@/utils/linkedInAuth";

export async function POST(request: NextRequest) {
  try {
    const { code, codeVerifier } = await request.json();
    console.log("Received code:", code);
    console.log("Received codeVerifier:", codeVerifier);

    // Validate required parameters
    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is required" },
        { status: 400 }
      );
    }

    if (!codeVerifier) {
      return NextResponse.json(
        { error: "Code verifier is required" },
        { status: 400 }
      );
    }

    const tokens = await linkedInAuth.getAccessToken(code, codeVerifier);
    console.log("Received tokens:", tokens);

    return NextResponse.json(tokens);
  } catch (error) {
    console.error("Token exchange error:", error);
    
    // Log more detailed error information
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // Return more specific error information
    return NextResponse.json(
      { 
        error: "Failed to exchange code for tokens",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}