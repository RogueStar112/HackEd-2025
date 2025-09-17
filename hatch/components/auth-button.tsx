// import Link from "next/link";
// import { Button } from "./ui/button";
// import { createClient } from "@/lib/supabase/server";
// import { LogoutButton } from "./logout-button";
// import { DashboardButton } from "./dashboard-button";

// export async function AuthButton() {
//     const supabase = await createClient();

//     // You can also use getUser() which will be slower.
//     const { data } = await supabase.auth.getClaims();

//     const user = data?.claims;

//     return user ? (
//         <div className="flex items-center gap-4">
//             {/* Hey, {user.email}! */}

//             <Button>
//                 <Link href="/projects/my">My Projects</Link>
//             </Button>

//             <Button>
//                 <Link href="/profile">My Profile</Link>
//             </Button>
//             <LogoutButton />
//         </div>
//     ) : (
//             <div className="flex gap-2">
//                 <Button asChild size="sm" variant={"outline"}>
//                     <Link href="/auth/login">Sign in</Link>
//                 </Button>
//                 <Button asChild size="sm" variant={"default"}>
//                     <Link href="/auth/sign-up">Sign up</Link>
//                 </Button>
//             </div>
//         );
// }

// components/auth-button.tsx (Server Component)
import { createClient } from "@/lib/supabase/server";
import { AuthMenuClient } from "./auth-menu-client";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return <AuthMenuClient user={user} />;
}
