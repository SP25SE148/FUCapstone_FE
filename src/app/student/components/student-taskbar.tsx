import { Home, Users, LayoutGrid, Bell, FileText } from 'lucide-react'

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
      label: "Tasks",
      href: "/student/tasks",
    },
    {
      icon: Bell,
      label: "Notification",
      href: "/student/notifications",
    },
  ];

  return (
    <Taskbar items={taskbarItems} />
  );
}
