export const runtime = "edge";
import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/utils/apiClient";

export async function POST(request: NextRequest) {
  try {
    const { publicKey } = await request.json();

    const response = await apiClient("/auth/get-nonce", {
      method: "POST",
      token: undefined,
      body: { publicKey },
    });

    const data = await response.json();

    // Return the tokens
    return NextResponse.json(data.nonce);
  } catch (error) {
    console.error("Get Nonce Error:", error);
    return NextResponse.json({ error: "Failed to get nonce" }, { status: 500 });
  }
}
