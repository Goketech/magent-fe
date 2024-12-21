import { supabase } from "../utils/supabase-client";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  try {
    const { error } = await supabase.from("waitlist").insert([{ email, name }]);
    if (error) {
      console.error("Error saving email to Supabase:", error);
      return new Response("Failed to save email", { status: 500 });
    } else {
      return new Response("Email saved successfully", { status: 200 });
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    if (
      err?.message ==
      'duplicate key value violates unique constraint "waitlist_email_key"'
    ) {
      return new Response("Email already exists in the waitlist.", {
        status: 409,
      });
    }
    console.error("Error saving email to Supabase:", err);
    return new Response("Failed to save email", { status: 500 });
  }
}
