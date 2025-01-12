"use client";

import { majorData } from "@/app/superadmin/majorgroups/table-data"; 
import OverallStats from "@/components/layout/overall-stats";

export default function MajorGroupOverallStats() {
  const items = [
    { title: "Total Major Groups", stat: majorData.length }
  ];

  return (
    OverallStats({ items })
  );
}
