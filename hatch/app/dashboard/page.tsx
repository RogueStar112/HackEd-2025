"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto p-6 flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Button onClick={() => router.push("/projects/create")}>
        Create Project
      </Button>

      <Button onClick={() => router.push("/projects/find")}>
        Find Projects
      </Button>

      <Button onClick={() => router.push("/projects/my")}>
        My Projects
      </Button>

      <Button onClick={() => router.push("/profile")}>
        My Profile
      </Button>
    </div>
  );
}

