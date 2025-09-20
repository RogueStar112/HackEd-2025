"use client";

import { useTheme } from "next-themes";
import { HatchLogo } from "./hatch-logo";
import { HatchLogoDark } from "./hatch-logo-dark";
import { useEffect, useState } from "react";

export function Hero() {

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

    
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          {theme == 'light' ? <HatchLogo /> : <HatchLogoDark />}
        </a>
        <span className="border-l rotate-45 h-6" />
        {/* <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a> */}
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-2xl text-center">
        Where <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-yellow-500 to-green-600">Collaboration</span> Is <span className="font-black">Born</span>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
