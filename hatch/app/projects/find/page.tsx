// @ts-nocheck
"use client";

import findProjectData from "@/app/actions/findProjectData";
import { useState } from "react";
import { Tag } from "@/lib/types";

export default function FindProjectsPage() {
    const [prompt, setPrompt] = useState("");
    const [ageMin, setAgeMin] = useState(18);
    const [ageMax, setAgeMax] = useState(40);
    const [timeMin, setTimeMin] = useState(1);
    const [timeMax, setTimeMax] = useState(10);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (formData: FormData) => {

        setError(null);

        const prompt = formData.get('prompt')!.toString();

        try {

            const tags = await findProjectData({ prompt }) as Tag[];
            const filtered = tags.map(tag => tag.categoryName);
            const findData = {
                tags: filtered,
                ageRange: { lowerBound: ageMin, upperBound: ageMax },
                timeCommitment: { lowerBound: timeMin, upperBound: timeMax },
            }
            console.log(findData);


        } catch (err: any) {
            console.error("Error generating tags:", err);
            setError(err.message || "An unexpected error occurred.");

        }
    };


    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Find Projects</h1>
            <form action={onSubmit} className="flex flex-col gap-4">
                <textarea
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the kind of project you want to join..."
                    className="border rounded p-2"
                />

                <div>
                    <label className="font-medium">Collaborator Age Range</label>
                    <div className="flex gap-2 items-center mt-1">
                        <input
                            type="number"
                            min={10}
                            max={100}
                            value={ageMin}
                            onChange={(e) => setAgeMin(Number(e.target.value))}
                            className="border p-1 rounded w-16"
                        />
                        <span>to</span>
                        <input
                            type="number"
                            min={10}
                            max={100}
                            value={ageMax}
                            onChange={(e) => setAgeMax(Number(e.target.value))}
                            className="border p-1 rounded w-16"
                        />
                        <span>years</span>
                    </div>
                </div>

                <div>
                    <label className="font-medium">Time Commitment (hours/week)</label>
                    <div className="flex gap-2 items-center mt-1">
                        <input
                            type="number"
                            min={1}
                            max={40}
                            value={timeMin}
                            onChange={(e) => setTimeMin(Number(e.target.value))}
                            className="border p-1 rounded w-16"
                        />
                        <span>to</span>
                        <input
                            type="number"
                            min={1}
                            max={40}
                            value={timeMax}
                            onChange={(e) => setTimeMax(Number(e.target.value))}
                            className="border p-1 rounded w-16"
                        />
                        <span>hrs/week</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-4 py-2"
                >
                    Find Projects
                </button>


                {error && <p className="text-red-600 font-medium">{error}</p>}

            </form>
        </div>
    );
}

