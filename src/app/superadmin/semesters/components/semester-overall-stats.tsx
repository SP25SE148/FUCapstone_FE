"use client";

import { useSemester } from "@/contexts/superadmin/superadmin-semester-context";

import OverallStats from "@/components/layout/overall-stats";

export default function SemesterOverallStats() {
  const { semesters } = useSemester();
  const items = [
    { title: "Total Semesters", stat: semesters.length }
  ];

  return (
    OverallStats({ items })
  );
}