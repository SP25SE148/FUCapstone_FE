"use client";

import { data } from "@/app/superadmin/admins/table-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/admins/component/admins-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddAdmin from "@/app/superadmin/admins/component/add-admin";

export default function AdminsTable() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Admins
          </CardTitle>
          <CardDescription>List of FPT University admins</CardDescription>
        </CardHeader>
        <AddAdmin />
      </div>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}

{
  /* <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl">Students</CardTitle>
                    <CardDescription>Campus Hồ Chí Minh</CardDescription>
                </CardHeader>
                <AddStudent />
            </div> */
}
