"use client"

import { useAuth } from "@/contexts/auth-context";
import { useSupervisor } from "@/contexts/supervisor-context";

import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/ui/data-table";
import AddSupervisor from "./add-supervisor/add-supervisor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupervisorTable() {
    const { user } = useAuth();
    const { supervisors, isLoading } = useSupervisor();

    return isLoading
        ?
        <SupervisorTable.Skeleton />
        :
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
        ;
}

SupervisorTable.Skeleton = () => {
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