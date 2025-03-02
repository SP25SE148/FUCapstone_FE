"use client"

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";
import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context";

import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicTable() {
    const { user } = useAuth();
    const router = useRouter();
    const { topicsOfSupervisor } = useSupervisorTopic();

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">My Topics</CardTitle>
                    <CardDescription>List topics of <span className="text-primary font-semibold">{user?.name}</span></CardDescription>
                </CardHeader>
                <Button className="m-6" onClick={() => { router.push("/supervisor/topics/look-up") }}>
                    <Search />
                    Look up
                </Button>
            </div>
            <CardContent>
                <DataTable columns={columns} data={topicsOfSupervisor} />
            </CardContent>
        </Card>
    );
}
