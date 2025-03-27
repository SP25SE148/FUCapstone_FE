"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Task, useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { columns } from "./components/columns";
import Dashboard from "./components/dashboard";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupTasksPage() {
    const { getProjectProgressTasks, dashboardFUCTaskOfGroup } = useSupervisorGroup();

    const searchParams = useSearchParams();
    const projectProgressId = searchParams.get('projectProgressId');

    const [dashboard, setDashboard] = useState<any>();
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
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Group Tasks</CardTitle>
                    <CardDescription>List of group tasks during project implementation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <DataTable columns={columns} data={projectProgressTask || []} />
                </CardContent>
            </Card>
        </>
    )
}