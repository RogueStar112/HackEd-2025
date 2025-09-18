/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import findProjectData from "@/app/actions/findProjectData";
import { useState } from "react";
import { Tag, FilterData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { HatchLogoNoText } from "@/components/hatch-logo-notext";

export default function FindProjectsPage() {
    const [prompt, setPrompt] = useState("");
    const [ageMin, setAgeMin] = useState(18);
    const [ageMax, setAgeMax] = useState(40);
    const [timeMin, setTimeMin] = useState(1);
    const [timeMax, setTimeMax] = useState(10);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
            } as FilterData;

            console.log(findData);

            // Encode as URL parameter
            const query = encodeURIComponent(JSON.stringify(findData));
            router.push(`/projects?filters=${query}`);


        } catch (err: any) {
            console.error("Error generating tags:", err);
            setError(err.message || "An unexpected error occurred.");

        }
    };


    return (
        <div className="max-w-md mx-auto gap-4 flex flex-col">

            <div className="flex w-full justify-between bg-gradient-to-r from-sky-50 to-blue-500 p-4">
              <HatchLogoNoText />
              <h1 className="text-md sm:text-3xl font-black items-center flex">Find Projects</h1>
            </div>


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
            <button
                className="bg-blue-600 text-white rounded px-4 py-2"
                onClick={() => router.push("/projects")}
            >
                Select All
            </button>
        </div>
    );
}

