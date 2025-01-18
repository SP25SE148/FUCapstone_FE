"use client";

import { Button } from "@/components/ui/button";
import { data } from "@/app/superadmin/admins/table-data"; 
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/admins/components/component/admins-table-columns"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminsTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Admins
            </CardTitle>
            <CardDescription>List of FPT University admins</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Add Campus</Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
