"use client";

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
import { useAdmin } from "@/contexts/admin-management-context";

export default function AdminsTable() {
  const { admins } = useAdmin();

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
        <DataTable columns={columns} data={admins} />
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
