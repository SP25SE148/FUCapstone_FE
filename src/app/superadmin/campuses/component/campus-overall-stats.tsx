"use client";

<<<<<<< HEAD
import { useCampus } from "@/contexts/superadmin/superadmin-campus-context";
=======
import { useCampus } from "@/contexts/superadmin/superadmin-campus-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
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