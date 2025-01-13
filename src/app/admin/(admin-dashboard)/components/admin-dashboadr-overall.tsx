"use client";

import { Users, UserRoundCog, UserPen, Newspaper } from "lucide-react";

import DashboardOverall from "@/components/layout/dashboard-overall";

export default function AdminDashBoardOverall() {
    const items = [
        { title: "Managers", stat: 10, icon: UserRoundCog },
        { title: "Supervisors", stat: 100, icon: UserPen },
        { title: "Students", stat: 1000, icon: Users },
        { title: "Announcements", stat: 50, icon: Newspaper },
    ];

    return DashboardOverall({ items });
}
