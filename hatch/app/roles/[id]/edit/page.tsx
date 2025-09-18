"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";

export default function EditRolePage() {
    const params = useParams();
    const router = useRouter();
    const roleId = params?.id as string;

    const supabase = createClient();
    const [role, setRole] = useState<any>(null);
    const [skillsText, setSkillsText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRole = async () => {
            const { data, error } = await supabase
                .from("roles")
                .select("*")
                .eq("id", roleId)
                .single();

            if (error || !data) {
                setError("Failed to load role");
            } else {
                setRole(data);
                setSkillsText(data.skills?.join(", ") || "");
            }
            setLoading(false);
        };
        loadRole();
    }, [roleId, supabase]);

    const updateField = (field: string, value: any) => {
        setRole((prev: any) => ({ ...prev, [field]: value }));
    };

    const save = async () => {
        if (!role) return;

        const updatedSkills = skillsText
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

        const { error } = await supabase
            .from("roles")
            .update({
                skills: updatedSkills,
                time_needed_hours: role.time_needed_hours,
            })
            .eq("id", role.id);

        if (error) {
            setError("Failed to save changes");
            return;
        }

        router.replace(`/projects/${role.project_id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!role) return <p>No role found</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Edit Role</h1>

            <div className="flex flex-col gap-4">
                <div className="border rounded p-3">
                    <label className="block text-sm font-medium mb-1">
                        Skills (comma separated)
                    </label>
                    <input
                        type="text"
                        value={skillsText}
                        onChange={(e) => setSkillsText(e.target.value)}
                        className="border p-2 rounded w-full"
                    />

                    <label className="block text-sm font-medium mt-2 mb-1">
                        Time Needed (hours)
                    </label>
                    <input
                        type="number"
                        value={role.time_needed_hours}
                        onChange={(e) =>
                            updateField("time_needed_hours", Number(e.target.value))
                        }
                        className="border p-2 rounded w-full"
                    />
                </div>
            </div>

            <button
                onClick={save}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Save Changes
            </button>
        </div>
    );
}

