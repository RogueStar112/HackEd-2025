"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/ai/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-2xl shadow-lg border"
      >
        <label className="block mb-2 text-lg font-semibold">Enter Prompt</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-xl mb-4"
          placeholder="Type something..."
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      <div className="w-full max-w-md mt-6 p-4 border rounded-xl bg-gray-50">
        <h2 className="font-semibold mb-2">Response:</h2>
        <pre className="text-sm whitespace-pre-wrap">
          {response ? JSON.stringify(response, null, 2) : "No response yet"}
        </pre>
      </div>
    </main>
  );
}
