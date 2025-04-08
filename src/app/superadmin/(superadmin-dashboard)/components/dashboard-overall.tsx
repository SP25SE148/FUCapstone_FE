"use client";

import { Users, BookDashed, UserPen, User, FileText } from "lucide-react";

import { useSuperadminDashboard } from "@/contexts/superadmin/superadmin-dashboard-context";

import DashboardOverall from "@/components/layout/dashboard-overall";

export default function DashBoardOverallStats() {
  const { dashboard } = useSuperadminDashboard();

  const items = [
    { title: "Capstones ", stat: dashboard?.capstones || 0, icon: BookDashed },
    { title: "Supervisors", stat: dashboard?.supervisors || 0, icon: UserPen },
    { title: "Students", stat: dashboard?.students || 0, icon: User },
    { title: "Groups", stat: dashboard?.groups || 0, icon: Users },
    { title: "Topics", stat: dashboard?.topics || 0, icon: FileText },
  ];

  return <DashboardOverall items={items} classnames={"md:grid-cols-3 lg:grid-cols-5"} />;
}
