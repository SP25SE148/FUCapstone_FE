"use client";

import { useAuth } from "@/contexts/auth-context";
import { useAdminManager } from "@/contexts/admin/admin-manager-context";

import AddManager from "./add-manager/add-manager";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManagerTable() {
    const { user } = useAuth();
    const { managers } = useAdminManager();

    return (
        <Card>
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl">Managers</CardTitle>
                    <CardDescription>Campus {user?.CampusId}</CardDescription>
                </CardHeader>
                <AddManager />
            </div>
            <CardContent>
                <DataTable columns={columns} data={managers || []} />
            </CardContent>
        </Card>
    )
}