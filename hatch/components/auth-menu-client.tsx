"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";

export function AuthMenuClient({ user }: { user: any }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const authLinks = user ? (
    <div className="flex flex-col sm:flex-row gap-4 my-auto [&>*]:grow sm:[&>*]:grow-0">
      <Button asChild>
        <Link href="/projects/my">My Projects</Link>
      </Button>

      <Button asChild>
        <Link href="/profile">My Profile</Link>
      </Button>

      <LogoutButton />
    </div>
  ) : (
    <>
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </>
  );

  return (
    <div className="relative flex items-center">
      {/* Hamburger button - visible on small screens */}
      <button
        className="sm:hidden my-auto h-full p-2 rounded-md focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menu - hidden on small screens unless menuOpen */}
      <div
        className={`mt-2 justify-center items-center h-full bg-white shadow-lg rounded-md p-2 sm:static sm:flex sm:gap-4 sm:shadow-none sm:bg-transparent sm:p-0 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {authLinks}
      </div>
    </div>
  );
}
