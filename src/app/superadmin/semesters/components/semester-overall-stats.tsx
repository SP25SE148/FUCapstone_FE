"use client";

import OverallStats from "@/components/layout/overall-stats";
import { useSemester } from "@/contexts/superadmin/superadmin-semester-context";

export default function SemesterOverallStats() {
  const { semesters } = useSemester();
  const items = [
    { title: "Total Semesters", stat: semesters.length }
  ];

  return (
    OverallStats({ items })
  );
}