"use client"

import { useSupervisorDashboard } from "@/contexts/supervisor/supervisor-dashboard-context";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EstimateTopic() {
    const { dashboard } = useSupervisorDashboard();
    return dashboard?.maxTopicsOfCapstoneEachMajor && <Card>
        <CardHeader className="p-6">
            <CardTitle>Estimate Topic</CardTitle>
            <CardDescription>The number of topics needed for each capstone.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboard?.maxTopicsOfCapstoneEachMajor && Object.entries(dashboard.maxTopicsOfCapstoneEachMajor as Record<string, number>)
                .sort(([, a], [, b]) => b - a) // sort giảm dần theo value
                .map(([key, value]) => (
                    <Card key={key} className="flex items-center justify-between p-4">
                        <CardTitle className="tracking-tight text-sm font-semibold">
                            {key}
                        </CardTitle>
                        <div className="text-sm font-medium text-muted-foreground">
                            <span className="text-base font-bold text-foreground">{value}</span> topic(s)
                        </div>
                    </Card>
                ))}
        </CardContent>
    </Card>
}