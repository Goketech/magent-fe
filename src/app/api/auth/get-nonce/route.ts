import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { publicKey } = await request.json();

    const response = await fetch("https://www.api.hellomagent.com/auth/get-nonce", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicKey }),
    });

    const data = await response.json();

    // Return the tokens
    return NextResponse.json(data.nonce);
  } catch (error) {
    console.error("Get Nonce Error:", error);
    return NextResponse.json({ error: "Failed to get nonce" }, { status: 500 });
  }
}
