"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getUserId } from "../../actions/getUserId"; // adjust path if needed
import { useRouter } from "next/navigation";

interface Project {
    id: string;
    name: string;
    description: string;
    category?: string | null;
}

export default function MyProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function loadProjects() {
            const userId = await getUserId();
            if (!userId) {
                setError("You must be logged in to see your projects.");
                setLoading(false);
                return;
            }

            const supabase = createClient();
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("user_id", userId);

            if (error) {
                setError(error.message);
            } else {
                setProjects(data ?? []);
            }

            setLoading(false);
        }

        loadProjects();
    }, []);

    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    if (projects.length === 0)
        return <p className="p-6">You don’t have any projects yet.</p>;

    return (
        <div className="max-w-xl mx-auto p-6 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-4">My Projects</h1>

            {projects.map((project) => (
                <div
                    key={project.id}
                    className="p-4 border rounded hover:shadow cursor-pointer"
                    onClick={() => router.push(`/projects/${project.id}`)}
                >
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                    {project.category && <p className="text-sm text-gray-500">{project.category}</p>}
                    <p className="mt-2">{project.description}</p>
                </div>
            ))}
            {/* Back to Dashboard button */}
            <button
                className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => router.push("/")}
            >
                Go Back to Dashboard
            </button>
        </div>
    );
}

