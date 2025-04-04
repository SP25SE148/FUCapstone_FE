"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSemester } from "@/contexts/superadmin/superadmin-semester-context";
import { semesterColumns } from "@/app/superadmin/semesters/components/semester-table-columns";
import AddSemester from "@/app/superadmin/semesters/components/add-semester";

export default function SemesterTable() {
  const { semesters } = useSemester();

console.log(semesters)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Semesters
            </CardTitle>
            <CardDescription>List of FPT University semesters</CardDescription>
          </div>
          <AddSemester />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={semesterColumns} data={semesters} />
      </CardContent>
    </Card>
  );
}