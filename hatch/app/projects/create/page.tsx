"use client";

import { useState } from "react";
import createProjectData from "@/app/actions/createProjectData";
import { CreateResponse, Tag } from "@/lib/types";
import { createProject } from "@/app/actions/createProject";
import { useRouter } from "next/navigation";


export default function Page() {

    const router = useRouter();

    const [projectName, setProjectName] = useState("");
    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (formData: FormData) => {

        setLoading(true);
        setError(null);

        const prompt = formData.get('prompt')!.toString();

        try {
            const { description, tags } = await createProjectData({
                prompt
            }) as CreateResponse;

            setDescription(description);
            setTags(tags.map((t) => ({ ...t, selected: false })));

        } catch (err: any) {
            console.error("Error generating tags:", err);
            setError(err.message || "An unexpected error occurred.");

        } finally {
            setLoading(false);
        }
    };

    const toggleTag = (index: number) => {
        setTags((prev) =>
            prev.map((t, i) => 
                i === index ? { ...t, selected: !t.selected } : t
            )
        );
    };

    // upload to database
    const submitSelected = () => {

        const filtered = tags.filter(tag => tag.selected).map(tag => tag.categoryName);
        createProject({ name: projectName, description, categories: filtered });

        // redirect to /projects/my
        router.push("/projects/my")

    }

    return (
        <div className="p-4">
            <form action={onSubmit} className="flex flex-col gap-2 max-w-md">
                <input 
                    type="text"
                    name="project-name"
                    placeholder="Give your project a name..."
                    value={projectName}
                    className="border p-2 rounded"
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <input
                    type="text"
                    name="prompt"
                    placeholder="Describe your project..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-4 py-2"
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Tags"}
                </button>
            </form>

            {error && (
                <p className="mt-2 text-red-600 font-medium">{error}</p>
            )}

            {description && (
                <div className="mt-6 p-4 border rounded bg-gray-50">
                    <h2 className="font-semibold mb-2">AI Description:</h2>
                    <p className="text-gray-700">{description}</p>
                </div>
            )}

            {tags.length > 0 && (
                <div className="mt-6">
                    <h2 className="font-semibold mb-2">Select Tags:</h2>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => toggleTag(i)}
                                className={`px-3 py-1 rounded ${
tag.selected ? "bg-green-500 text-white" : "bg-gray-300 text-black"
}`}
                            >
                                {tag.categoryName}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={submitSelected}
                        className="mt-4 bg-purple-600 text-white rounded px-4 py-2"
                    >
                        Create Project
                    </button>
                </div>
            )}
        </div>
    );

}
