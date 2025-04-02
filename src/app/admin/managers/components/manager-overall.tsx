"use client"

import { useAdminManager } from "@/contexts/admin/admin-manager-context";

import Overall from "@/app/admin/components/overall";

export default function ManagerOverall() {
    const { managers } = useAdminManager();

    const items = [
        { title: "Total Manager(s)", value: managers.length || 0 },
    ];

    return (
        <Overall items={items} />
    );
}
