"use client";

import { useState } from "react";
import findProjectData from "@/app/actions/findProjectData";

export default function FindProjectsPage() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<any[]>([]);

    const onSubmit = async (formData: FormData) => {
        setError(null);
        setLoading(true);

        const query = formData.get("prompt")!.toString();

        try {
            // const data = await findProjects(query); // call your backend action
            // setResults(data);
        } catch (err: any) {
            console.error("Error finding projects:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Find a Project</h1>

            <form action={onSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what kind of project you want..."
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-4 py-2"
                    disabled={loading}
                >
                    {loading ? "Finding..." : "Find Projects"}
                </button>
            </form>

            {error && <p className="mt-3 text-red-600">{error}</p>}

            {results.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Results:</h2>
                    <ul className="list-disc list-inside">
                        {results.map((r, i) => (
                            <li key={i}>{r.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

