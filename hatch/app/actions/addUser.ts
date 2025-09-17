import { createClient } from "@/lib/supabase/client";

interface FormData {
    username: string;
    name: string;
    birth_year: number;
    birth_month: number | null;
    birth_day: number | null;
    interests: string[];
    skills: string[];
}

export async function addUser(formData: FormData) {

    const supabase = createClient();

    // Get the currently logged-in user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return { error: "No logged-in user found" };
    }

    const data = { id: user.id, ...formData };

    // first testing
    console.log(data);


    // Inject the correct UUID from the authenticated user
    const { error } = await supabase.from("profiles").upsert([data]);

    if (error) {
        console.error("Supabase insert error:", error.message);
        return { error: error.message };
    }

    return { success: true };
}

