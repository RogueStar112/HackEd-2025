import { createClient } from "@/lib/supabase/client";

export async function getUserId(): Promise<string | null> {
    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        console.error("Failed to get user:", error?.message);
        return null;
    }

    return user.id;
}

