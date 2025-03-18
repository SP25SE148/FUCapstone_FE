"use client"

import { Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Task, useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupTasksPage() {
    const { getProjectProgressTasks } = useSupervisorGroup();

    const router = useRouter();
    const searchParams = useSearchParams();
    const projectProgressId = searchParams.get('projectProgressId');

    const [projectProgressTask, setProjectProgressTask] = useState<Task[]>();

    useEffect(() => {
        (async () => {
            const projectProgressTasksRes = await getProjectProgressTasks(projectProgressId || "");
            setProjectProgressTask(projectProgressTasksRes);
        })();
    }, [projectProgressId])

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center">
                <Button className="ml-6" size={"icon"}
                    onClick={() => router.back()}
                >
                    <Undo2 />
                </Button>
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Group Tasks</CardTitle>
                    <CardDescription>List of group tasks during project implementation.</CardDescription>
                </CardHeader>
            </div>
            <CardContent>
                <DataTable columns={columns} data={projectProgressTask || []} />
            </CardContent>
        </Card>
    )
}