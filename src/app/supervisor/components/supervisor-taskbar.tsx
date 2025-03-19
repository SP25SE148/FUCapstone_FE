import { Home, Users, Bell, FileText, CalendarDays } from 'lucide-react'

import { Taskbar } from "@/components/layout/app-taskbar";

export default function SupervisorTaskbar() {
  const taskbarItems = [
    {
      icon: Home,
      label: "Home",
      href: "/supervisor/home",
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
      icon: CalendarDays,
      label: "Calendars",
      href: "/supervisor/calendars",
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
