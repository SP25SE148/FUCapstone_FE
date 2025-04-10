"use client";

import { useAdmin } from "@/contexts/superadmin/superadmin-admin-context";

import OverallStats from "@/components/layout/overall-stats";

export default function AdminsOverallStats() {
  const { admins } = useAdmin();

  const items = [
    { title: "Total Admins", stat: admins.length }
  ];

  return (
    OverallStats({ items })
  );
}
