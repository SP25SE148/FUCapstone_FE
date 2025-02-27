"use client"

import Overall from "@/app/admin/components/overall";
import { useAdminStudent } from "@/contexts/admin/admin-student-context";

export default function StudentOverall() {
    const { students, isLoading } = useAdminStudent();

    const items = [
        { title: "Total Student(s)", value: students?.length || 0 },
    ];

    return (
        <Overall items={items} isLoading={isLoading} />
    );
}
