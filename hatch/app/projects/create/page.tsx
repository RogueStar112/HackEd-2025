"use client";

import { useState } from "react";
import generateTags from "@/app/actions/ai";
import { AIMode } from "@/lib/types";

interface Tag {
    categoryName: string;
}

export default function Page() {

    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (formData: FormData) => {
        setLoading(true);
        const description = formData.get('description')!.toString();
        try {
            const result = await generateTags({ mode: AIMode.create, prompt: description }) as Tag[];
            setTags(result);
            console.log(result);
        } catch (err) {
            console.error("Error generating tags:", err);
        } finally {
            console.log(tags);
            setLoading(false);
        }
        
    };

    return (
        <div className="p-4">
            <form action={onSubmit} className="flex flex-col gap-2 max-w-md">
                <input
                    type="text"
                    name="description"
                    placeholder="Describe your project..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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

            {tags.length > 0 && (
                <div className="mt-4">
                    <h2 className="font-semibold">Tags:</h2>
                    <ul className="list-disc list-inside">
                        {tags.map((tag, i) => (
                            <li key={i}>{tag.categoryName}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
