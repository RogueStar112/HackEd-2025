"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DashboardButton() {
  const router = useRouter();

  const goToDashboard = async () => {
    router.push("/dashboard");
  };

  return <Button onClick={goToDashboard}>Dashboard</Button>;
}
