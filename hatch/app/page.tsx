import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { HatchLogoNoText } from "@/components/hatch-logo-notext";
import { Plus, SearchCheck } from "lucide-react";

export default async function Home() {

    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-gradient-to-r from-sky-50 to-blue-500 sm:p-16">
                    <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                        <div className="flex gap-5 w-full justify-between font-semibold">
                            <HatchLogoNoText />
                        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
                        </div>
                    </div>
                </nav>
                <div className="flex flex-col sm:w-[512px] items-center justify-center gap-20 max-w-5xl p-5">

                    {!user ? <Hero /> : (

                        <div className="mx-auto p-6 flex flex-col gap-4">

                            <Button className="w-full h-full bg-green-800">
                                <Link href="/projects/create" className="w-[184px] h-[92px] items-center flex flex-col justify-center [&>svg]:scale-[2] gap-4"><Plus></Plus>Create Project</Link>
                            </Button>
                            <Button className="w-full h-full bg-blue-600">
                                <Link href="/projects/find" className="w-[184px] h-[92px] items-center flex flex-col justify-center [&>svg]:scale-[2] gap-4"><SearchCheck></SearchCheck>Find Project</Link>
                            </Button>
                        </div>
                    )}
                    <main className="flex-1 flex flex-col gap-6 px-4">
                        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2>
                        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
                    </main>
                </div>

                <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                    <p>
                        &copy; 2025 | Where Collaboration is Born
                    </p>
                    <ThemeSwitcher />
                </footer>
            </div>
        </main>
    );
}
