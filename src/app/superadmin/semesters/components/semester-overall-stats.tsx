"use client";

import { semesterData } from "@/app/superadmin/semesters/table-data";
import OverallStats from "@/components/layout/overall-stats";

export default function SemesterOverallStats() {
  const items = [
    { title: "Total Campuses", stat: semesterData.length }
  ];

  return (
    OverallStats({ items })
  );
}
