import { createClient } from "@/lib/supabase/client";
import BackButton from "@/components/back-button";

interface ProjectPageProps {
    params: { id: string }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;

    const supabase = createClient();
    const { data: project, error } = await supabase
        .from('projects')
        .select(`
        *,
        profiles(username, name),
        roles(*)
`)
        .eq('id', id)
        .single()

    if (error || !project) {
        return <p>Project not found</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="max-w-3xl mx-auto p-4">
                <BackButton />
                <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
                <p className="mb-2">{project.description}</p>
                <p className="mb-2">Owner: {project.profiles?.username}</p>

                <h2 className="text-xl font-semibold mt-4">Roles</h2>
                <ul className="ml-4 list-disc">
                    {project.roles?.map((role: any) => (
                        <li key={role.id}>
                            Skills: {role.skills.join(', ')} | Hours: {role.time_needed_hours}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

