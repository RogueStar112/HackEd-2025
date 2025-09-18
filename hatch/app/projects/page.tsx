import { createClient } from "@/lib/supabase/client";
import ProjectsList from "@/components/projects-list";
import { ProjectsPageRow, FilterData } from "@/lib/types";


export default async function Page(
    props: { searchParams: Promise<{ filters?: string}> }
) {

    const { filters } = await props.searchParams;

    const supabase = createClient();

    const { data: projects, error } = await supabase
        .from("projects")
        .select(`
            id,
            name,
            description,
            categories,
            profiles (name),
            roles ( id, skills, time_needed_hours )
        `);

    console.log(error);

    if (error) {
        console.error(error);
        return <div className="p-4 text-red-500">Failed to load projects.</div>;
    }

    const filterData = (filters
        ? JSON.parse(filters)
        : null) as FilterData | null;

    return (
        <div className="max-w-5xl mx-auto p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <ProjectsList
                initialProjects={projects as ProjectsPageRow[] || []}
                filterData={filterData}
            />
        </div>
    );
}
