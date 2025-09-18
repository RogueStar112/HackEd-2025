import { createClient } from "@/lib/supabase/client";
import BackButton from "@/components/back-button";
import { projectTraceSource } from "next/dist/build/swc/generated-native";
import { HatchLogoNoText } from "@/components/hatch-logo-notext";

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
            <div className="max-w-3xl mx-auto p-4 flex flex-col gap-4">
                             <div className="flex w-full justify-between bg-gradient-to-r from-sky-50 to-blue-500 p-4">
                              <HatchLogoNoText />
                              <h1 className="text-md sm:text-3xl font-black items-center flex">{project.name}</h1>
                </div>

                <div className="w-full flex justify-between">
                    <BackButton />
                      <p className="mb-2">Owner: {project.profiles?.username}</p>

                </div>

                <p className="mb-2">{project.description}</p>
              
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

