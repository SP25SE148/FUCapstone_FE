"use client";
import DashboardOverall from "@/components/layout/dashboard-overall";
import { Users, GraduationCap, School, BookDashed } from "lucide-react";

export default function DashBoardOverallStats() {
  const items = [
    { title: "Student", stat: 1478, icon: Users },
    { title: "Supervisors", stat: 304, icon: GraduationCap },
    { title: "Campus", stat: 5, icon: School },
    { title: "Capstone Subject", stat: 3, icon: BookDashed },
  ];

  return DashboardOverall({ items });
}
