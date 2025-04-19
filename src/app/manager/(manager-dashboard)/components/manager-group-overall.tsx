"use client";

import { Users, User, Calculator, Trophy, Clock } from "lucide-react";

import { useManagerDashboard } from "@/contexts/manager/manager-dashboard-context";

import DashboardOverall from "@/components/layout/dashboard-overall";

export default function ManagerGroupOverall() {
    const { dashboard } = useManagerDashboard();

    const items = [
        { title: "Students", stat: dashboard?.students || 0, icon: User },
        { title: "Groups", stat: dashboard?.groups || 0, icon: Users },
        { title: "Group Size", stat: dashboard?.averageGroupSize || 0, icon: Calculator },
    ];

    const itemsSecondary = [
        { title: "Task Completion", stat: (dashboard?.taskCompletionRate * 100).toFixed(2) || 0, icon: Trophy },
        { title: "Overdue Task", stat: dashboard?.overdueTaskCount || 0, icon: Clock },
    ];

    return (
        <>
            <DashboardOverall items={items} classnames="md:grid-cols-1 lg:grid-cols-3" />
            <DashboardOverall items={itemsSecondary} classnames="lg:grid-cols-2" />
        </>
    )
}
