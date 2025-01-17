"use client";

import { Button } from "@/components/ui/button";
import { majorData } from "@/app/superadmin/majorgroups/table-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function MajorGroupTable() {
  const data = majorData;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Major Groups
            </CardTitle>
            <CardDescription>List of FPT University Major Groups</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Add Major Groups</Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
