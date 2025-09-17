import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { HatchLogo } from "@/components/hatch-logo";
import { HatchLogoNoText } from "@/components/hatch-logo-notext";

export default async function Home() {

    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
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

                            <Button className="w-full h-full">
                                <Link href="/projects/create">Create Project</Link>
                            </Button>
                            <Button className="w-full h-full">
                                <Link href="/projects/find">Find Project</Link>
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
                        Powered by{" "}
                        <a
                            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                            target="_blank"
                            className="font-bold hover:underline"
                            rel="noreferrer"
                        >
                            Supabase
                        </a>
                    </p>
                    <ThemeSwitcher />
                </footer>
            </div>
        </main>
    );
}
