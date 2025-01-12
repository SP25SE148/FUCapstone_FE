"use client";

import { data } from "@/app/superadmin/campuses/table-data";
import OverallStats from "@/components/layout/overall-stats";

export default function CampusOverallStats() {
  const items = [
    { title: "Total Campuses", stat: data.length }
  ];

  return (
    OverallStats({ items })
  );
}
