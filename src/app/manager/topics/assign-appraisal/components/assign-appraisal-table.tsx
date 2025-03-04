"use client";

import { columns, Topic } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAssignAppraisal } from "@/contexts/manager/manager-assign-appraisal-context";
import AddSupervisor from "./add-supervisor";

export default function AssignAppraisalTable() {
  const { supervisors, loading} = useAssignAppraisal();

  const data: Topic[] = supervisors.map((supervisor) => ({
    id: supervisor.id,
    fullName: supervisor.fullName,
    majorName: supervisor.majorName,
    campusName: supervisor.campusName,
    email: supervisor.email,
  }));

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
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}