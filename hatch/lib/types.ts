export interface ProjectsPageRow {
    id: string;
    name: string;
    description: string;
    category: string;
    owner: string;
    profiles: { name: string };
    roles: { id: string, skills: string[], time_needed_hours: string }[]; 
}

export enum AIMode {
    find = "find",
    create = "create"
}
