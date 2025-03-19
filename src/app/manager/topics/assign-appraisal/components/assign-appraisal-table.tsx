"use client";

import { useAssignAppraisal } from "@/contexts/manager/manager-assign-appraisal-context";

import { columns } from "./columns";
import AddSupervisor from "./add-supervisor";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssignAppraisalTable() {
  const { supervisors } = useAssignAppraisal();

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">Assign Appraisal</CardTitle>
            <CardDescription>List of supervisors available for appraisal assignment</CardDescription>
          </div>
          <AddSupervisor />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={supervisors || []} />
      </CardContent>
    </Card>
  );
}