"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectPageClient({
    project,
    isOwner,
}: {
        project: any;
        isOwner: boolean;
    }) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleRoleClick = () => {
        if (isOwner) {
            router.push(`/projects/${project.id}/roles/edit`);
        } else {
            setError("You must be the project owner to edit roles.");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <p className="mb-2">{project.description}</p>
            <p className="mb-2">Owner: {project.profiles?.username}</p>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <div className="mt-4 grid gap-3">
                {project.roles?.length ? (
                    project.roles.map((role: any) => (
                        <button
                            type="button"
                            key={role.id}
                            onClick={handleRoleClick}
                            className="text-left border rounded-md p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <h3 className="font-semibold mb-1">Role</h3>
                            <p>
                                <span className="font-medium">Skills:</span>{" "}
                                {role.skills?.join(", ")}
                            </p>
                            <p>
                                <span className="font-medium">Time Needed:</span>{" "}
                                {role.time_needed_hours} hours
                            </p>
                        </button>
                    ))
                ) : (
                        <p className="text-gray-500">No roles listed yet.</p>
                    )}
            </div>
        </div>
    );
}

