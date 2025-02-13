"use client";

import { columns, Manager } from "./columns";
import AddManager from "./add-manager/add-manager";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useManager } from "@/contexts/manager-context";



export default function ManagerTable() {
    const { managers } = useManager();
    return (
        <Card>
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl">Managers</CardTitle>
                    <CardDescription>Campus Hồ Chí Minh</CardDescription>
                </CardHeader>
                <AddManager />
            </div>
            <CardContent>
                <DataTable columns={columns} data={managers} />
            </CardContent>
        </Card>
    );
}
