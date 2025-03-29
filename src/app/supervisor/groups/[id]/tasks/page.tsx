"use client"

import { Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { DashBoardTask, Task } from "@/types/types";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { columns } from "./components/columns";
import Dashboard from "./components/dashboard";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupTasksPage() {
    const { getProjectProgressTasks, dashboardFUCTaskOfGroup } = useSupervisorGroup();

    const router = useRouter();
    const searchParams = useSearchParams();
    const projectProgressId = searchParams.get('projectProgressId');

    const [dashboard, setDashboard] = useState<DashBoardTask>();
    const [projectProgressTask, setProjectProgressTask] = useState<Task[]>();

    useEffect(() => {
        (async () => {
            try {
                const [projectProgressTasksRes, dashboardFUCTaskOfGroupRes] = await Promise.all([
                    getProjectProgressTasks(projectProgressId || ""),
                    dashboardFUCTaskOfGroup(projectProgressId || "")
                ]);

                setProjectProgressTask(projectProgressTasksRes);
                setDashboard(dashboardFUCTaskOfGroupRes)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, [projectProgressId])

    return (
        <>
            {dashboard && <Dashboard data={dashboard} />}
            <Card className="min-h-[calc(100vh-60px)]">
                <div className="flex items-center">
                    {!dashboard && <Button className="ml-6" size={"icon"}
                        onClick={() => router.back()}
                    >
                        <Undo2 />
                    </Button>}
                    <CardHeader>
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">Group Tasks</CardTitle>
                        <CardDescription>List of group tasks during project implementation.</CardDescription>
                    </CardHeader>
                </div>
                <CardContent className="space-y-4">
                    <DataTable columns={columns} data={projectProgressTask || []} />
                </CardContent>
            </Card>
        </>
    )
}