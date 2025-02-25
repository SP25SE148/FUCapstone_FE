"use client"

import Overall from "@/app/admin/components/overall";
import { useStudent } from "@/contexts/student-context";

export default function StudentOverall() {
    const { students, isLoading } = useStudent();

    const items = [
        { title: "Total Student(s)", value: students?.length || 0 },
    ];

    return (
        <Overall items={items} isLoading={isLoading} />
    );
}
