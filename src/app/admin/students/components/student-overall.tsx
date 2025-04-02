"use client"

import { useAdminStudent } from "@/contexts/admin/admin-student-context";

import Overall from "@/app/admin/components/overall";

export default function StudentOverall() {
    const { students } = useAdminStudent();

    const items = [
        { title: "Total Student(s)", value: students?.length || 0 },
    ];

    return (
        <Overall items={items} />
    );
}
