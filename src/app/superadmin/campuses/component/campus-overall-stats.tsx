"use client";

import { useCampus } from "@/contexts/campus-context";
import OverallStats from "@/components/layout/overall-stats";

export default function CampusOverallStats() {
  const { campuses } = useCampus();

  const totalCampuses = campuses.length;
  const activeCampuses = campuses.filter(campus => !campus.isDeleted).length;
  const inactiveCampuses = campuses.filter(campus => campus.isDeleted).length;

  const items = [
    { title: "Total Campuses", stat: totalCampuses },
    { title: "Active Campuses", stat: activeCampuses },
    { title: "Inactive Campuses", stat: inactiveCampuses }
  ];

  return (
    OverallStats({ items })
  );
}