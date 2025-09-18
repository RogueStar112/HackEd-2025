"use client";

import { use, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import BackButton from "@/components/back-button";
import { useRouter } from "next/navigation";
import { projectTraceSource } from "next/dist/build/swc/generated-native";
import { HatchLogoNoText } from "@/components/hatch-logo-notext";

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const { id } = use(params);
    const supabase = createClient();
    const router = useRouter();

    const [userId, setUserId] = useState<string | null>(null);
    const [project, setProject] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUserId(user?.id ?? null);

            const { data, error } = await supabase
                .from("projects")
                .select(`
*,
profiles(username, name),
roles(*)
`)
                .eq("id", id)
                .single();

            if (error) setError("Project not found");
                else setProject(data);
        };

        load();
    }, [id, supabase]);

    if (error) return <p>{error}</p>;
    if (!project) return <p>Loading...</p>;

    const isOwner = userId === project.user_id;

    const handleRoleClick = (roleId: string) => {
        if (isOwner) {
            router.push(`/roles/${roleId}/edit`);
        } else {
            alert("You are not the owner of this project.");
        }
    };

    const handleNewRole = async () => {
        if (!isOwner) {
            alert("Only the project owner can create roles.");
            return;
        }

        const { data, error } = await supabase
            .from("roles")
            .insert({
                project_id: project.id,
                skills: [],
                time_needed_hours: 0
            })
            .select("id")
            .single();

        if (error || !data) {
            alert("Failed to create role");
            return;
        }

        // Use replace so back doesn't go to the empty create page again
        router.replace(`/roles/${data.id}/edit`);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <BackButton />
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <p className="mb-2">{project.description}</p>
            <p className="mb-2">Owner: {project.profiles?.username}</p>

            {isOwner && (
                <button
                    onClick={handleNewRole}
                    className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + New Role
                </button>
            )}

            <h2 className="text-xl font-semibold mt-4 mb-2">Roles</h2>
            <div className="flex flex-wrap gap-2">
                {project.roles?.map((role: any) => (
                    <button
                        key={role.id}
                        onClick={() => handleRoleClick(role.id)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md border"
                    >
                        <div className="text-sm font-semibold">
                            {role.skills.join(", ")}
                        </div>
                        <div className="text-xs text-gray-500">
                            Hours: {role.time_needed_hours}
                        </div>
                    </button>
                ))}
            </div>
            {/* <div className="max-w-3xl mx-auto p-4 flex flex-col gap-4"> */}
            {/*                  <div className="flex w-full justify-between bg-gradient-to-r from-sky-50 to-blue-500 p-4"> */}
            {/*                   <HatchLogoNoText /> */}
            {/*                   <h1 className="text-md sm:text-3xl font-black items-center flex">{project.name}</h1> */}
            {/*     </div> */}
            {/**/}
            {/*     <div className="w-full flex justify-between"> */}
            {/*         <BackButton /> */}
            {/*           <p className="mb-2">Owner: {project.profiles?.username}</p> */}
            {/**/}
            {/*     </div> */}
            {/**/}
            {/*     <p className="mb-2">{project.description}</p> */}
            {/**/}
            {/*     <h2 className="text-xl font-semibold mt-4">Roles</h2> */}
            {/*     <ul className="ml-4 list-disc"> */}
            {/*         {project.roles?.map((role: any) => ( */}
            {/*             <li key={role.id}> */}
            {/*                 Skills: {role.skills.join(', ')} | Hours: {role.time_needed_hours} */}
            {/*             </li> */}
            {/*         ))} */}
            {/*     </ul> */}
            {/* </div> */}
        </div>
    );
}

