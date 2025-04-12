import { Users, LayoutGrid, FileText, ClipboardCheck, ShieldCheck, BookUser } from 'lucide-react'

import { Taskbar } from "@/components/layout/app-taskbar";

export default function StudentTaskbar() {
  const taskbarItems = [
    {
      icon: BookUser,
      label: "Informations",
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
