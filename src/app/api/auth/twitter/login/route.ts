import { NextResponse } from "next/server";
import { twitterAuth } from "@/utils/xAuth";

export const runtime = "edge";

export async function GET() {
  try {
    const response = await twitterAuth.getAuthUrl();

    return NextResponse.json(response);
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.json(
      { error: "Failed to exchange code for tokens" },
      { status: 500 }
    );
  }
}
