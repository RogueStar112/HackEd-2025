import { createClient } from "@/lib/supabase/client";
import ProjectsList from "@/components/projects-list";
import { ProjectsPageRow, FilterData } from "@/lib/types";
import { HatchLogoNoText } from "@/components/hatch-logo-notext";


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

            <div className="flex w-full justify-between bg-gradient-to-r from-sky-50 to-blue-500 p-4">
                          <HatchLogoNoText />
                          <h1 className="text-md sm:text-3xl font-black items-center flex">Projects</h1>
            </div>

            <ProjectsList
                initialProjects={projects as ProjectsPageRow[] || []}
                filterData={filterData}
            />
        </div>
    );
}
