"use client";

import OverallStats from "@/components/layout/overall-stats";
import { useAdmin } from "@/contexts/superadmin/superadmin-admin-management";

export default function AdminsOverallStats() {
  const { admins } = useAdmin();

  const items = [
    { title: "Total Admins", stat: admins.length }
  ];

  return (
    OverallStats({ items })
  );
}
