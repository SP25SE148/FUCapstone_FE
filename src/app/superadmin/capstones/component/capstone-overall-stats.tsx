"use client";

import { CapstoneData } from "@/app/superadmin/capstones/table-data"; 
import OverallStats from "@/components/layout/overall-stats";

export default function CapstoneOverallStats() {
  const items = [
    { title: "Total Capstones", stat: CapstoneData.length }
  ];

  return (
    OverallStats({ items })
  );
}
