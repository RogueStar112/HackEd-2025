"use client";

import { useState, useMemo } from "react";
import ProjectInfoBox from "./project-info-box";
import { Input } from "@/components/ui/input";
import CategorySelect from "./category-select";
import { ProjectsPageRow } from "@/lib/types";


export default function ProjectsList({ initialProjects }: {initialProjects: ProjectsPageRow[]}) {

    const [category, setCategory] = useState("All");
    const [query, setQuery] = useState("");


    // filter by name and category
    const filtered = useMemo(() => {
        return initialProjects.filter((p) => {
            const matchesName = p.name.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = category === "All" || p.category === category;
            return matchesName && matchesCategory;
        });
    }, [initialProjects, query, category]);


    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <Input
                    placeholder="Search projects..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="max-w-sm"
                />
                <CategorySelect onChange={setCategory} />
            </div>
            <div className="grid gap-4">
                {filtered.length > 0 ? (
                    filtered.map((project) => (
                        <ProjectInfoBox
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            description={project.description}
                            category={project.category}
                            owner={project.owner}
                            profiles={project.profiles}
                            roles={project.roles}

                        />
                    ))
                ) : (
                        <p className="text-sm text-gray-500">No projects found.</p>
                    )}
            </div>
        </div>
    );
}

