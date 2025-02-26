"use client";

import { useCampus } from "@/contexts/superadmin/superadmin-campus-management";
import OverallStats from "@/components/layout/overall-stats";

export default function CampusOverallStats() {
  const { campuses } = useCampus();

  const activeCampuses = campuses.filter(campus => !campus.isDeleted);
  const inactiveCampuses = campuses.filter(campus => campus.isDeleted);

  const items = [
    { title: "Total Campuses", stat: campuses.length },
    { title: "Active Campuses", stat: activeCampuses.length },
    { title: "Inactive Campuses", stat: inactiveCampuses.length }
  ];

  return (
    OverallStats({ items })
  );
}