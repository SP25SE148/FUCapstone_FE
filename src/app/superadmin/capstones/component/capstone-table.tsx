"use client";
import { Button } from "@/components/ui/button";
import { CapstoneData } from "@/app/superadmin/capstones/table-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/capstones/component/capstone-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CapstoneTable() {
    const data = CapstoneData;
  

  return (
    <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Capstones
          </CardTitle>
          <CardDescription>List of FPT University Capstones</CardDescription>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Add Capstones</Button>
      </div>
    </CardHeader>
    <CardContent>
      <DataTable columns={columns} data={data} />
    </CardContent>
  </Card>
  );
}
