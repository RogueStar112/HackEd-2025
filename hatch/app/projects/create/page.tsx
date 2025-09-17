"use client";

import { useState } from "react";
import generateTags from "@/app/actions/ai";
import { AIMode, Tag } from "@/lib/types";


export default function Page() {

    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (formData: FormData) => {

        setLoading(true);
        setError(null);

        const description = formData.get('description')!.toString();

        try {
            const result = await generateTags({
                mode: AIMode.create,
                prompt: description
            }) as Tag[];

            setTags(result.map((t) => ({ ...t, selected: false })));

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

    const submitSelected = () => {
        console.log(tags);
        // send to backend if needed
    }

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

            {error && (
                <p className="mt-2 text-red-600 font-medium">{error}</p>
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
                        Submit Selected Tags
                    </button>
                </div>
            )}
        </div>
    );

    // return (
    //     <div className="p-4">
    //         <form action={onSubmit} className="flex flex-col gap-2 max-w-md">
    //             <input
    //                 type="text"
    //                 name="description"
    //                 placeholder="Describe your project..."
    //                 value={description}
    //                 onChange={(e) => setDescription(e.target.value)}
    //                 className="border p-2 rounded"
    //             />
    //             <button
    //                 type="submit"
    //                 className="bg-blue-600 text-white rounded px-4 py-2"
    //                 disabled={loading}
    //             >
    //                 {loading ? "Generating..." : "Generate Tags"}
    //             </button>
    //         </form>
    //
    //         {tags.length > 0 && (
    //             <div className="mt-4">
    //                 <h2 className="font-semibold">Tags:</h2>
    //                 <ul className="list-disc list-inside">
    //                     {tags.map((tag, i) => (
    //                         <li key={i}>{tag.categoryName}</li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         )}
    //     </div>
    // );
}
