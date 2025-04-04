"use client"

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { SupervisorTopicProvider } from "@/contexts/supervisor/supervisor-topic-context";

import UpdateTopicForm from "./components/update-topic-form";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpdateTopicPage() {
    const router = useRouter();

    return (
        <SupervisorTopicProvider>
            <Card className="min-h-[calc(100vh-60px)]">
                <div className="flex items-center">
                    <Button className="ml-6" size={"icon"}
                        onClick={() => router.back()}
                    >
                        <Undo2 />
                    </Button>
                    <CardHeader>
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">
                            Update Topic
                        </CardTitle>
                        <CardDescription>
                            Edit the topic information to update it.
                        </CardDescription>
                    </CardHeader>
                </div>
                <UpdateTopicForm />
            </Card>
        </SupervisorTopicProvider>
    );
}