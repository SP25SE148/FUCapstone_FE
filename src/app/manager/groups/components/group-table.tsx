"use client"

import { useAuth } from "@/contexts/auth-context";
import { useManagerGroup } from "@/contexts/manager/manager-group-context";

import ExportGroup from "./export-group";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupTable() {
    const { user } = useAuth();
    const { groupList } = useManagerGroup();

    return (
        <Card>
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl">Group(s)</CardTitle>
                    <CardDescription>{user?.CapstoneId}</CardDescription>
                </CardHeader>
                <ExportGroup groupList={groupList} />
            </div>
            <CardContent>
                <DataTable columns={columns} data={groupList || []} />
            </CardContent>
        </Card>
    );
}
