import { createClient } from "@/lib/supabase/client";
import ProjectsList from "@/components/projects-list";
import { ProjectsPageRow } from "@/lib/types";


export default async function Page() {

    const supabase = createClient();


    // const { data: projects, error } = await supabase
    //     .from("profiles")
    //     .select(`*`);

    const { data: projects, error } = await supabase
        .from("profiles")
        .select("*");
    // const { data: projects, error } = await supabase
    //     .from("projects")
    //     .select(`
    //         id,
    //         profiles!projects_user_id_fkey (
    //             name
    //         )
    //     `);
        // .select(`
        //     id,
        //     name,
        //     description,
        //     category,
        //     profiles!projects_user_id_fkey (
        //         name
        //     ),
        //     roles ( id, skills, time_needed_hours )
        // `);


    console.log(projects);

    if (error) {
        console.error(error);
        return <div className="p-4 text-red-500">Failed to load projects.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            {/* <ProjectsList initialProjects={projects as ProjectsPageRow[] || []} /> */}
        </div>
    );
}
