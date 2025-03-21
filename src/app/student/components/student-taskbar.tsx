import { Home, Users, LayoutGrid, Bell, FileText, ClipboardCheck, ShieldCheck } from 'lucide-react'

import { Taskbar } from "@/components/layout/app-taskbar";

export default function StudentTaskbar() {
  const taskbarItems = [
    {
      icon: Home,
      label: "Annoucements",
      href: "/student/home",
    },
    {
      icon: Users,
      label: "Groups",
      href: "/student/groups",
    },
    {
      icon: FileText,
      label: "Topics",
      href: "/student/topics",
    },
    {
      icon: LayoutGrid,
      label: "Workspace",
      href: "/student/workspace",
    },
    {
      icon: ClipboardCheck,
      label: "Reviews",
      href: "/student/reviews",
    },
    {
      icon: ShieldCheck,
      label: "Defenses",
      href: "/student/defenses",
    },
  ];

  return (
    <Taskbar items={taskbarItems} />
  );
}
