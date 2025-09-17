import { createClient } from "@/lib/supabase/client";

export default async function ProfilePage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (!user) {
        return <p className="p-6">You must be logged in to view your profile.</p>;
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error || !profile) {
        return <p className="p-6 text-red-500">Profile not found.</p>;
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <p>
                <strong>Username:</strong> {profile.username}
            </p>
            <p>
                <strong>Name:</strong> {profile.name}
            </p>
            <p>
                <strong>Birth Year:</strong> {profile.birth_year}
            </p>
            {profile.birth_month && (
                <p>
                    <strong>Birth Month:</strong> {profile.birth_month}
                </p>
            )}
            {profile.birth_day && (
                <p>
                    <strong>Birth Day:</strong> {profile.birth_day}
                </p>
            )}
            {profile.skills?.length > 0 && (
                <p>
                    <strong>Skills:</strong> {profile.skills.join(", ")}
                </p>
            )}
            {profile.interests?.length > 0 && (
                <p>
                    <strong>Interests:</strong> {profile.interests.join(", ")}
                </p>
            )}
        </div>
    );
}

