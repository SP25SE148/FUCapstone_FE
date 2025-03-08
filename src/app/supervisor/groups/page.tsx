"use client"

import { ArrowRight } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation";

export default function GroupsPage() {
    const { user } = useAuth();
    const router = useRouter();

    return (
        <Card className="min-h-[calc(100vh-16px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">My Group(s)</CardTitle>
                <CardDescription>List groups of <span className="text-primary font-semibold">{user?.name}</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <h3 className="text-sm text-muted-foreground">Semester: SPRING 2025</h3>
                <div className="grid grid-cols-4 gap-4">
                    <Card
                        className="relative h-40 p-6 select-none cursor-pointer overflow-hidden bg-gradient-to-tr from-primary/10 to-background hover:bg-muted dark:border dark:border-primary"
                        onClick={() => { router.push("/supervisor/groups/1") }}
                    >
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">GSP25SE41</CardTitle>
                        <CardDescription>FPT University Capstone Management</CardDescription>
                        <div className="absolute bottom-4 flex items-center gap-2 font-semibold text-sm text-primary hover:text-blue-400">Go to workspace <ArrowRight className="size-4" /></div>
                    </Card>
                    <Card
                        className="relative h-40 p-6 select-none cursor-pointer overflow-hidden bg-gradient-to-tr from-primary/10 to-background hover:bg-muted dark:border dark:border-primary"
                        onClick={() => { router.push("/supervisor/groups/1") }}
                    >
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">GSP25SE41</CardTitle>
                        <CardDescription>FPT University Capstone Management</CardDescription>
                        <div className="absolute bottom-4 flex items-center gap-2 font-semibold text-sm text-primary hover:text-blue-400">Go to workspace <ArrowRight className="size-4" /></div>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}