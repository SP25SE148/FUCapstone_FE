import { CalendarCog, Info } from "lucide-react";

import Config from "./components/config";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfigurationsPage() {
    return (
        <Card className="min-h-[calc(100vh-96px)] bg-gradient-to-tr from-primary/5 to-background">
            <CardHeader className="bg-primary/5 rounded-t-lg">
                <CardTitle className="font-semibold tracking-tight text-xl text-primary flex items-center gap-2"><CalendarCog /> Time Configurations</CardTitle>
                <CardDescription>Configure timing for your campus.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                <div className="p-4 rounded-lg border border-primary/90 flex items-center gap-4">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1.5">
                        <h4 className="font-semibold text-primary">Time Configurations Notes</h4>
                        <p className="text-sm text-primary">Changes to these settings will affect behavior across the entire <strong>CAMPUS</strong>.</p>
                        <p className="text-sm text-muted-foreground">Please make sure you understand the implications before making changes.</p>
                    </div>
                </div>
                <Config />
            </CardContent>
        </Card>
    )
}