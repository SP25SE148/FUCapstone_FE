"use client";

import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-management";
import OverallStats from "@/components/layout/overall-stats";

export default function MajorGroupOverallStats() {
  const { majorGroups } = useMajorGroup();
  const activeMajorGroups = majorGroups.filter(majorGroups => !majorGroups.isDeleted);
  const inactiveMajorGroups= majorGroups.filter(majorGroups => majorGroups.isDeleted);
  
  const items = [
    { title: "Total Major Groups", stat: majorGroups.length },
    { title: "Active Major Groups", stat: activeMajorGroups.length },
    { title: "Inactive Major Groups", stat: inactiveMajorGroups.length }
  ];

  return (
    OverallStats({ items })
  );
}