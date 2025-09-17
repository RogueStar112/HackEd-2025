"use client";

import { useState } from "react";

export default function FindProjectsPage() {
    const [prompt, setPrompt] = useState("");
    const [ageMin, setAgeMin] = useState(18);
    const [ageMax, setAgeMax] = useState(40);
    const [timeMin, setTimeMin] = useState(1);
    const [timeMax, setTimeMax] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                prompt,
                ageRange: { lowerBound: ageMin, upperBound: ageMax },
                timeCommitment: { lowerBound: timeMin, upperBound: timeMax },
            };

            const res = await fetch("/api/find-projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to find projects");

            const data = await res.json();
            console.log("Found projects:", data);
            // you could navigate or display results here
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-semibold mb-4">Find Projects</h1>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
                    disabled={loading}
                    className="bg-blue-600 text-white rounded px-4 py-2"
                >
                    {loading ? "Finding..." : "Find Projects"}
                </button>

                {error && <p className="text-red-600 font-medium">{error}</p>}
            </form>
        </div>
    );
}

