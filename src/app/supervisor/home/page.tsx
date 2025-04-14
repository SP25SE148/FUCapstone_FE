import { SupervisorDashboardProvider } from "@/contexts/supervisor/supervisor-dashboard-context";

import SummaryCards from "./components/summary-cards";
import CompletionOverdueChart from "./components/completion-overdue-chart";
import AverageTaskDurationChart from "./components/average-task-duration-chart";
import StudentContributionsChart from "./components/student-contributions-chart";
import TaskPriorityDistributionChart from "./components/task-priority-distribution-chart";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    return (
        <SupervisorDashboardProvider>
            <Card className="min-h-[calc(100vh-16px)]">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Dashboard</CardTitle>
                    <CardDescription>Dashboard overview about my groups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SummaryCards />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <CompletionOverdueChart />
                        <AverageTaskDurationChart />
                        <TaskPriorityDistributionChart />
                        <StudentContributionsChart />
                    </div>
                </CardContent>
            </Card>
        </SupervisorDashboardProvider>
    )
}