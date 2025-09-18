import { createClient } from "@/lib/supabase/server";
import { AuthMenuClient } from "./auth-menu-client";

export async function AuthButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return <AuthMenuClient user={user} />;
}
