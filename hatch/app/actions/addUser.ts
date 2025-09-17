"use server";

import { createClient } from "@supabase/supabase-js";

// process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY! // use service role for server actions
);

interface FormData {
  id: string;
  username: string;
  name: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  interests: string[];
  skills: string[];
}

export async function addUser(data: FormData) {
  const { error, data: inserted } = await supabase
    .from("profiles")
    .insert([data])
    .select();

  if (error) {
    console.error("Supabase insert error:", error.message);
    return { error: error.message };
  }

  return { success: true, inserted };
}
