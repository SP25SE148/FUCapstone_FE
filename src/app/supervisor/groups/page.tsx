"use client"

import { useAuth } from "@/contexts/auth-context";

import CoManage from "./components/co-manage";
import MainManage from "./components/main-manage";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GroupsPage() {
    const { user } = useAuth();

    return (
        <Card className="min-h-[calc(100vh-16px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">My Group(s)</CardTitle>
                <CardDescription>List groups of <span className="text-primary font-semibold">{user?.name}</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <MainManage />
                <Separator />
                <CoManage />
            </CardContent>
        </Card>
    )
}