"use client";

import { Users, UserPen, User, FileText } from "lucide-react";

import DashboardOverall from "@/components/layout/dashboard-overall";

export default function ManagerDashBoardOverall() {
    const items = [
        { title: "Supervisors", stat: 20, icon: UserPen },
        { title: "Students", stat: 400, icon: User },
        { title: "Groups", stat: 100, icon: Users },
        { title: "Topics", stat: 120, icon: FileText },
    ];

    return DashboardOverall({ items });
}
