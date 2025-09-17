import { createClient } from "@/lib/supabase/client";

interface ProjectData {
    name: string;
    description: string;
    categories: string[];
}


export async function createProject(projectData: ProjectData) {

    const supabase = createClient();

    // Get the currently logged-in user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return { error: "No logged-in user found" };
    }

    const data = { user_id: user.id, ...projectData };



    // first testing
    console.log(data);


    // Inject the correct UUID from the authenticated user
    const { error } = await supabase.from("projects").upsert([data]);

    if (error) {
        console.error("Supabase insert error:", error.message);
        return { error: error.message };
    }

    return { success: true };
}

