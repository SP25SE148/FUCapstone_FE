"use client"

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAdminConfig } from "@/contexts/admin/admin-config-context";

import { Button } from "@/components/ui/button";

export default function CreateTimeConfig() {
    const router = useRouter();
    const { nextSemester } = useAdminConfig();

    return nextSemester &&
        <Button className="mr-6" onClick={() => router.push("/admin/configurations/create")}>
            <PlusCircle />
            Add
        </Button>
}