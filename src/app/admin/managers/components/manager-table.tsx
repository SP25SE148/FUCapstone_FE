"use client";

import { useAuth } from "@/contexts/auth-context";
import { useAdminManager } from "@/contexts/admin/admin-manager-context";

import { columns } from "./columns";
import AddManager from "./add-manager/add-manager";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManagerTable() {
    const { user } = useAuth();
    const { managers, isLoading } = useAdminManager();

    return isLoading
        ?
        <ManagerTable.Skeleton />
        :
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
        ;
}

ManagerTable.Skeleton = () => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <CardHeader>
                    <Skeleton className="h-7 w-24" />
                    <Skeleton className="h-5 w-24" />
                </CardHeader>
                <Skeleton className="mr-6 h-9 w-20" />
            </div>
            <CardContent>
                <div className="flex items-center justify-between py-4">
                    <Skeleton className="h-9 w-80" />
                    <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="h-[440px] w-full" />
                <div className="flex items-center justify-between py-4">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-8 w-[480px]" />
                </div>
            </CardContent>
        </Card>
    )
}