import { createClient } from "@/lib/supabase/client";
import ProjectInfoBox from "@/components/project-info-box";

interface Role {
    id: string,
    project_id: string,
    skills: string[],
    time_needed_hours: number
};

interface Project {
    id: string,
    user_id: string,
    name: string,
    description: string,
    category: string,
    roles: Role[],
    profiles: Profile,

};

interface Profile {
    id: string,
    username: string,
    name: string,
    birth_year: number
    birth_month: number,
    birth_day: number,
    interests: string[],
    skills: string[]
}


export default async function Page() {

    const supabase = createClient();
    const { data: projects, error } = await supabase
        .from('projects')
        .select(`
            *,
            profiles(username, name)
        `)

    if (error) return <p>Error loading projects: {error.message}</p>;

    return (
        <div className="max-w-5xl mx-auto p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            {projects?.map((project: Project) => (
                <ProjectInfoBox
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    owner={project.profiles?.username}
                    category={project.category}
                    roles={project.roles}
                />
            ))}
        </div>
    );
}
