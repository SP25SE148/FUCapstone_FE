"use client";

import { data } from "@/app/superadmin/admins/table-data"; 
import OverallStats from "@/components/layout/overall-stats";

export default function AdminsOverallStats() {
  const items = [
    { title: "Total Admins", stat: data.length }
  ];

  return (
    OverallStats({ items })
  );
}
