'use client';
import { useRouter } from "next/navigation";

interface ProjectInfoBoxProps {
    id: string
    name: string
    description: string
    owner?: string
    category?: string
    roles?: { skills: string[]; time_needed_hours: number }[]
}

export default function ProjectInfoBox({ id, name, description, owner, category, roles }: ProjectInfoBoxProps) {

    const router = useRouter();

    const redirect = () => {
        router.push(`/projects/${id}`);
    }

    return (
        <div 
            className="border rounded p-4 shadow hover:shadow-lg transition flex flex-col gap-2"
            onClick={redirect}
            tabIndex={0}
            role="button"
        >
            <h2 className="text-lg font-bold">{name}</h2>
            {owner && <p className="text-sm text-gray-600">Owner: {owner}</p>}
            {category && <p className="text-sm text-gray-600">Category: {category}</p>}
            <p>{description}</p>
            {roles && roles.length > 0 && (
                <div className="mt-2">
                    <p className="font-semibold text-sm">Roles:</p>
                    <ul className="ml-4 list-disc text-sm">
                        {roles.map((role, idx) => (
                            <li key={idx}>
                                Skills: {role.skills.join(", ")} | Hours: {role.time_needed_hours}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

