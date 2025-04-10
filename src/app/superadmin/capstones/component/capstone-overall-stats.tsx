"use client";

import { useCapstone } from "@/contexts/superadmin/superadmin-capstone-context";

import OverallStats from "@/components/layout/overall-stats";

export default function CapstoneOverallStats() {
  const { capstones } = useCapstone();

  const activeCapstones = capstones.filter(capstone => !capstone.isDeleted);
  const inactiveCapstones = capstones.filter(capstone => capstone.isDeleted);

  const items = [
    { title: "Total Capstones", stat: capstones.length },
    { title: "Active Capstones", stat: activeCapstones.length },
    { title: "Inactive Capstones", stat: inactiveCapstones.length }
  ];

  return (
    <OverallStats items={items} />
  );
}