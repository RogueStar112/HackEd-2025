"use client";

import Link from "next/link";

export default function CategorySelect({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Selected categories:</span>{" "}
        {selectedCategories.length > 0
          ? selectedCategories.join(", ")
          : "None"}
      </p>

      <Link
        href="/projects/find"
        className="inline-block bg-blue-600 text-white text-sm rounded px-4 py-2 w-fit"
      >
        Change filters
      </Link>
    </div>
  );
}

