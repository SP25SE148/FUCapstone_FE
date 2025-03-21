import { Home, Users, Bell, FileText, ClipboardCheck, ShieldCheck } from 'lucide-react'

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
      icon: ClipboardCheck,
      label: "Reviews",
      href: "/supervisor/reviews",
    },
    {
      icon: ShieldCheck,
      label: "Defenses",
      href: "/supervisor/defenses",
    },
  ];

  return (
    <Taskbar items={taskbarItems} />
  );
}
