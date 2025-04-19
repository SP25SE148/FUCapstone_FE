"use client";

import { UserPen, FileText, Calculator } from "lucide-react";

import { useManagerDashboard } from "@/contexts/manager/manager-dashboard-context";

import DashboardOverall from "@/components/layout/dashboard-overall";

export default function ManagerDashBoardOverall() {
    const { dashboard } = useManagerDashboard();

    const items = [
        { title: "Supervisors", stat: dashboard?.supervisors || 0, icon: UserPen },
        { title: "Estimate Topic", stat: dashboard?.maxTopicsOfCapstone || 0, icon: Calculator },
        { title: "Topics", stat: dashboard?.topics || 0, icon: FileText },
    ];

    return <DashboardOverall items={items} classnames="lg:grid-cols-3" />;
}
