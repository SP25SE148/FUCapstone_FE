"use client"

import Overall from "@/app/admin/components/overall";
import { useAdminSupervisor } from "@/contexts/admin/admin-supervisor-context";

export default function SupervisorOverall() {
    const { supervisors, isLoading } = useAdminSupervisor();

    const items = [
        { title: "Total Supervisor(s)", value: supervisors?.length || 0 },
    ];

    return (
        <Overall items={items} isLoading={isLoading} />
    );
}
