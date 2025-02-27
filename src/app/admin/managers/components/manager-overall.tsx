"use client"

import Overall from "@/app/admin/components/overall";
import { useAdminManager } from "@/contexts/admin/admin-manager-context";

export default function ManagerOverall() {
    const { managers, isLoading } = useAdminManager();

    const items = [
        { title: "Total Manager(s)", value: managers.length || 0 },
    ];

    return (
        <Overall items={items} isLoading={isLoading} />
    );
}
