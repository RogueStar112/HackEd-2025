"use client";

import { useState, useMemo } from "react";
import ProjectInfoBox from "./project-info-box";
import { Input } from "@/components/ui/input";
import CategorySelect from "./category-select";
import { ProjectsPageRow, FilterData } from "@/lib/types";

interface ProjectsListProps {
    initialProjects: ProjectsPageRow[];
    filterData: FilterData | null;
}

export default function ProjectsList({
    initialProjects, filterData
}: ProjectsListProps) {

    const [query, setQuery] = useState("");
    const [tags, setTags] = useState<string[]>(filterData?.tags ?? []); // now multiple
    const [ageRange, setAgeRange] = useState(filterData?.ageRange ?? { lowerBound: 0, upperBound: 100 });
    const [timeRange, setTimeRange] = useState(filterData?.timeCommitment ?? { lowerBound: 0, upperBound: 100 });


    const filtered = useMemo(() => {
        return initialProjects.filter((p) => {
            // 1. Name filter
            const matchesName = p.name.toLowerCase().includes(query.toLowerCase());

            // 2. Tags filter — at least one tag must be included in categories
            console.log(tags);
            const matchesTags =
                tags.length === 0 ||
                    tags.some((t) =>
                        p.categories?.map((c) => c.toLowerCase()).includes(t.toLowerCase())
                    );

            // 3. Age filter — for now, check if project has *any* role that fits age range
            const matchesAge = true; 
            // (if you had ages per role you'd check them here)

            // 4. Time commitment filter — if *any* role has time_needed_hours in range
            const matchesTime =
                (p.roles && p.roles.length > 0) ? (
                    p.roles?.some(
                        (r) =>
                            r.time_needed_hours >= timeRange.lowerBound &&
                                r.time_needed_hours <= timeRange.upperBound
                    ) ?? false
                ) : true;

            // console.log(!!p.roles);
            // console.log(p, matchesName, matchesTags, matchesAge, matchesTime);
            return matchesName && matchesTags && matchesAge && matchesTime;
        });
    }, [initialProjects, query, tags, ageRange, timeRange]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4 items-end">
                <Input
                    placeholder="Search projects..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="max-w-sm"
                />

                <CategorySelect selectedCategories={tags} />

                <div className="flex items-center gap-2">
                    <label className="text-sm">Age:</label>
                    <input
                        type="number"
                        className="border rounded p-1 w-16"
                        value={ageRange.lowerBound}
                        onChange={(e) =>
                            setAgeRange({ ...ageRange, lowerBound: Number(e.target.value) })
                        }
                    />
                    <span>-</span>
                    <input
                        type="number"
                        className="border rounded p-1 w-16"
                        value={ageRange.upperBound}
                        onChange={(e) =>
                            setAgeRange({ ...ageRange, upperBound: Number(e.target.value) })
                        }
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm">Time (hrs/week):</label>
                    <input
                        type="number"
                        className="border rounded p-1 w-16"
                        value={timeRange.lowerBound}
                        onChange={(e) =>
                            setTimeRange({ ...timeRange, lowerBound: Number(e.target.value) })
                        }
                    />
                    <span>-</span>
                    <input
                        type="number"
                        className="border rounded p-1 w-16"
                        value={timeRange.upperBound}
                        onChange={(e) =>
                            setTimeRange({ ...timeRange, upperBound: Number(e.target.value) })
                        }
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {filtered.length > 0 ? (
                    filtered.map((project) => (
                        <ProjectInfoBox
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            description={project.description}
                            categories={project.categories}
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

