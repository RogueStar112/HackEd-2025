export interface ProjectsPageRow {
    id: string;
    name: string;
    description: string;
    categories: string[],
    owner: string;
    profiles: { name: string };
    roles: { id: string, skills: string[], time_needed_hours: number }[]; 
}

export enum AIMode {
    find = "find",
    create = "create"
}

export interface CreateResponse {
    description: string;
    tags: Tag[];
}

export interface Tag {
    categoryName: string;
    selected?: boolean;
}

export interface FilterData {
    tags: string[],
    ageRange: { lowerBound: number, upperBound: number },
    timeCommitment: { lowerBound: number, upperBound: number }
}

