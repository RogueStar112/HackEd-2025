"use client";

import { useEffect, useState } from "react";

export default function CategorySelect({ onChange }: {
  onChange: (category: string) => void;
}) {

  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/categories.json");
      const data = await res.json();
      setCategories(["All", ...data]);
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 w-48">
      <select
        value={selected}
        onChange={handleChange}
        className="border rounded-md p-2 text-sm"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

