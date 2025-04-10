"use client";

import { useSemester } from "@/contexts/superadmin/superadmin-semester-context";

import AddSemester from "@/app/superadmin/semesters/components/add-semester";

import { DataTable } from "@/components/ui/data-table";
import { semesterColumns } from "@/app/superadmin/semesters/components/semester-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

export default function SemesterTable() {
  const { semesters } = useSemester();

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Semesters
          </CardTitle>
          <CardDescription>List of FPT University semesters</CardDescription>
        </CardHeader>
        <AddSemester />
      </div>
      <CardContent>
        <DataTable columns={semesterColumns} data={semesters} />
      </CardContent>
    </Card>
  );
}