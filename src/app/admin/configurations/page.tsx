import { CalendarCog, Info } from "lucide-react";

import CreateTimeConfig from "./components/create-time-config";

import TimeConfigTable from "./components/time-config-table";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfigurationsPage() {
    return (
        <Card className="min-h-[calc(100vh-96px)]">
            <div className="flex items-center justify-between bg-primary/5 rounded-t-lg">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary flex items-center gap-2"><CalendarCog /> Time Configurations</CardTitle>
                    <CardDescription>Configure timing for your campus.</CardDescription>
                </CardHeader>
                <CreateTimeConfig />
            </div>
            <TimeConfigTable />
        </Card>
    )
}