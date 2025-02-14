"use client"

import Overall from "@/app/admin/components/overall";
import { useSupervisor } from "@/contexts/supervisor-context";

export default function SupervisorOverall() {
    const { supervisors } = useSupervisor();

    const items = [
        { title: "Total Supervisor(s)", value: supervisors?.length || 0 },
    ];

    return (
        <Overall items={items} />
    );
}
