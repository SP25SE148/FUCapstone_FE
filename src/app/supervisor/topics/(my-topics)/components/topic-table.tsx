"use client"

import { useRouter } from "next/navigation";
import { PlusCircle, Search } from "lucide-react";

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
                <div className="flex items-center gap-2">
                    <Button
                        variant={"outline"}
                        onClick={() => { router.push("/supervisor/topics/look-up") }}
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                        <Search />
                        Look up
                    </Button>
                    <Button className="mr-6" onClick={() => { router.push("/supervisor/topics/register-topic") }}>
                        <PlusCircle />
                        Register Topic
                    </Button>
                </div>
            </div>
            <CardContent className="space-y-8">
                <MainSupervisor />
                <Separator />
                <CoSupervisors />
            </CardContent>
        </Card>
    );
}
