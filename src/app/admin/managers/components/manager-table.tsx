"use client";

import { useAuth } from "@/contexts/auth-context";
import { useManager } from "@/contexts/manager-context";

import { columns } from "./columns";
import AddManager from "./add-manager/add-manager";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManagerTable() {
    const { user } = useAuth();
    const { managers } = useManager();

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
    );
}
