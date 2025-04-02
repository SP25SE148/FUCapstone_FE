"use client"

import { useAdminSupervisor } from "@/contexts/admin/admin-supervisor-context";

import Overall from "@/app/admin/components/overall";

export default function SupervisorOverall() {
    const { supervisors } = useAdminSupervisor();

    const items = [
        { title: "Total Supervisor(s)", value: supervisors?.length || 0 },
    ];

    return (
        <Overall items={items} />
    );
}
