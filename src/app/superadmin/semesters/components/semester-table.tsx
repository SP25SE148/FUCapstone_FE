"use client";


import { columns } from "@/app/superadmin/semesters/components/semester-table-columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { semesterData } from "@/app/superadmin/semesters/table-data";

export default function SemesterTable() {
  const data = semesterData;

  return (
    <div className="rounded-lg border shadow-sm w-full bg-background">
      <div className="justify-between items-center px-3 py-4 ">
        <div className="flex w-full justify-between">
          <Button className="bg-primary hover:bg-primary/90">Add Semester</Button>
        </div>
        <DataTable columns={columns} data={data} filter="name" />
      </div>
    </div>
  );
}
