"use client"

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";

import CoSupervisors from "./co-superviorors";
import MainSupervisor from "./main-supervioror";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicTable() {
    const { user } = useAuth();
    const router = useRouter();

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
            <CardContent className="space-y-8">
                <MainSupervisor />
                <Separator />
                <CoSupervisors />
            </CardContent>
        </Card>
    );
}
