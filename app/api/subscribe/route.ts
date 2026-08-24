import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase-admin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: string | undefined;

  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    // Supabase isn't wired up yet — tell the caller honestly instead of
    // pretending the subscribe succeeded.
    return NextResponse.json(
      { error: "Subscriptions aren't connected yet. Try again soon." },
      { status: 503 }
    );
  }

  const { error } = await supabaseAdmin
    .from("subscribers")
    .insert({ email })
    .select()
    .single();

  if (error) {
    // Unique constraint violation = already subscribed; treat as success.
    if (error.code === "23505") {
      return NextResponse.json({ status: "already_subscribed" }, { status: 200 });
    }
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  return NextResponse.json({ status: "subscribed" }, { status: 201 });
}
