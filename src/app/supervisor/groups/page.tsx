"use client"

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GroupsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const { groupList } = useSupervisorGroup();

    return (
        <Card className="min-h-[calc(100vh-16px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">My Group(s)</CardTitle>
                <CardDescription>List groups of <span className="text-primary font-semibold">{user?.name}</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <h3 className="text-sm text-muted-foreground">Semester: {groupList?.[0]?.semesterCode}</h3>
                <div className="grid grid-cols-4 gap-4">
                    {groupList?.map((group, index) => (
                        <Card
                            key={index}
                            className="relative h-40 p-6 select-none cursor-pointer overflow-hidden bg-primary/5 hover:bg-primary/10"
                            onClick={() => { router.push(`/supervisor/groups/${group?.groupId}`) }}
                        >
                            <CardTitle className="font-semibold tracking-tight text-xl text-primary">{group?.groupCode}</CardTitle>
                            <CardDescription>{group?.englishName}</CardDescription>
                            <div className="absolute bottom-4 flex items-center gap-2 font-semibold text-sm text-primary hover:text-blue-400">Go to workspace <ArrowRight className="size-4" /></div>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}