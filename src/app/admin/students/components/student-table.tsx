"use client"

import { useAuth } from "@/contexts/auth-context";
import { useAdminStudent } from "@/contexts/admin/admin-student-context";

import AddStudent from "./add-student/add-student";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentTable() {
    const { user } = useAuth();
    const { students } = useAdminStudent();

    return (
        <Card>
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl">Students</CardTitle>
                    <CardDescription>Campus {user?.CampusId}</CardDescription>
                </CardHeader>
                <AddStudent />
            </div>
            <CardContent>
                <DataTable columns={columns} data={students || []} />
            </CardContent>
        </Card>
    );
}