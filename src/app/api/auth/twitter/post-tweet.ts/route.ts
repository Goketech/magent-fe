import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token, text } = await request.json();

    const response = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    // Return the tokens
    return NextResponse.json(data.text);
  } catch (error) {
    console.error("Get Nonce Error:", error);
    return NextResponse.json({ error: "Failed to get nonce" }, { status: 500 });
  }
}
