import { NextResponse } from "next/server";
import { linkedInAuth } from "@/utils/linkedInAuth";

export async function GET(){
    try {
        const response = linkedInAuth.getAuthUrl();

        return NextResponse.json(response);
    } catch (error) {
        console.error("Token exchange error:", error);
            return NextResponse.json(
              { error: "Failed to exchange code for tokens" },
              { status: 500 }
            );
    }
}