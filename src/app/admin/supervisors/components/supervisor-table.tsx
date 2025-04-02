"use client"

import { useAuth } from "@/contexts/auth-context";
import { useAdminSupervisor } from "@/contexts/admin/admin-supervisor-context";

import AddSupervisor from "./add-supervisor/add-supervisor";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupervisorTable() {
    const { user } = useAuth();
    const { supervisors } = useAdminSupervisor();

    return (
        <Card>
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl">Supervisors</CardTitle>
                    <CardDescription>Campus {user?.CampusId}</CardDescription>
                </CardHeader>
                <AddSupervisor />
            </div>
            <CardContent>
                <DataTable columns={columns} data={supervisors || []} />
            </CardContent>
        </Card>
    );
}