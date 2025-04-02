import { NextRequest, NextResponse } from "next/server";

const LINKEDIN_API_URL = "https://api.linkedin.com/v2/userinfo";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization"); // Get the Bearer token from the request

    if (!authHeader) {
      return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
    }

    // Fetch user profile from LinkedIn API
    const response = await fetch(LINKEDIN_API_URL, {
      method: "GET",
      headers: {
        Authorization: authHeader, // Pass Bearer token
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const userData = await response.json();
    return NextResponse.json(userData, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
