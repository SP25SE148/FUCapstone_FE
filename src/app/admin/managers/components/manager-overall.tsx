"use client"

import Overall from "@/app/admin/components/overall";
import { useManager } from "@/contexts/manager-context";

export default function ManagerOverall() {
    const { managers } = useManager();

    const items = [
        { title: "Total Manager(s)", value: managers.length },
    ];

    return (
        <Overall items={items} />
    );
}
