"use client";

import { data } from "@/app/superadmin/campuses/table-data";

export default function OverallStats() {
  return (
    <div className=" p-4 dark:bg-darkbackground  rounded-lg shadow-sm">
      <div>
        <h3 className="text-purple-500 mb-2">Total Campuses</h3>
        <p className="text-2xl font-semibold">{data.length}</p>
      </div>
    </div>
  );
}
