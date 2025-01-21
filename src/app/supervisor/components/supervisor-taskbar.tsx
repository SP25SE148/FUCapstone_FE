import { Home, Users, Bell, FileText } from 'lucide-react'

import { Taskbar } from "@/components/layout/app-taskbar";

export default function SupervisorTaskbar() {
  const taskbarItems = [
    {
      icon: Home,
      label: "Home",
      href: "/supervisor",
    },
    {
      icon: FileText,
      label: "Topics",
      href: "/supervisor/topics",
    },
    {
      icon: Users,
      label: "Groups",
      href: "/supervisor/groups",
    },
    {
      icon: Bell,
      label: "Notification",
      href: "/supervisor/notifications",
    },
  ];

  return (
    <Taskbar items={taskbarItems} />
  );
}
