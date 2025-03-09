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

    console.log("response", response);


    const data = await response.json();

    // Return the tokens
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to post tweet:", error);
    return NextResponse.json({ error: "Failed to post tweet" }, { status: 500 });
  }
}
