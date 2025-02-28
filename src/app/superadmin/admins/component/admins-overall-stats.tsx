"use client";

import OverallStats from "@/components/layout/overall-stats";
<<<<<<< HEAD
import { useAdmin } from "@/contexts/superadmin/superadmin-admin-context";
=======
import { useAdmin } from "@/contexts/superadmin/superadmin-admin-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd

export default function AdminsOverallStats() {
  const { admins } = useAdmin();

  const items = [
    { title: "Total Admins", stat: admins.length }
  ];

  return (
    OverallStats({ items })
  );
}
