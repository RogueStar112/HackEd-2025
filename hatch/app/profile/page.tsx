// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserId } from "../actions/getUserId";
import { createClient } from "@/lib/supabase/client";

interface Profile {
    username: string;
    name: string;
    birth_year: number;
    birth_month?: number | null;
    birth_day?: number | null;
    interests?: string[];
    skills?: string[];
}

export default function ProfilePage() {

    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function loadProfile() {
            const userId = await getUserId();
            if (!userId) {
                setError("You must be logged in to view your profile.");
                setLoading(false);
                return;
            }

            const supabase = createClient();
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (error || !data) {
                setError("Profile not found.");
            } else {
                setProfile(data);
            }

            setLoading(false);
        }

        loadProfile();
    }, []);

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <p><strong>Username:</strong> {profile?.username}</p>
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Birth Year:</strong> {profile?.birth_year}</p>
            {profile?.birth_month && <p><strong>Birth Month:</strong> {profile.birth_month}</p>}
            {profile?.birth_day && <p><strong>Birth Day:</strong> {profile.birth_day}</p>}
            {profile?.skills?.length && <p><strong>Skills:</strong> {profile.skills.join(", ")}</p>}
            {profile?.interests?.length && <p><strong>Interests:</strong> {profile.interests.join(", ")}</p>}
            {/* Go Back button */}
            <button
                className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => router.push("/")}
            >
                Go Back to Main Menu
            </button>
        </div>
    );
}

