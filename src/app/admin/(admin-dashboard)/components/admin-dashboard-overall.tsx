"use client";

import { Users, UserPen, User, FileText } from "lucide-react";

import { useAdminDashboard } from "@/contexts/admin/admin-dashboard-context";

import DashboardOverall from "@/components/layout/dashboard-overall";

export default function AdminDashBoardOverall() {
    const { dashboard } = useAdminDashboard();

    const items = [
        { title: "Supervisors", stat: dashboard?.supervisors || 0, icon: UserPen },
        { title: "Students", stat: dashboard?.students || 0, icon: User },
        { title: "Groups", stat: dashboard?.groups || 0, icon: Users },
        { title: "Topics", stat: dashboard?.topics || 0, icon: FileText },
    ];

    return DashboardOverall({ items });
}
