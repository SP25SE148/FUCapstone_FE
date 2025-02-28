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
<<<<<<< HEAD
import { useAdmin } from "@/contexts/superadmin/superadmin-admin-context";
=======
import { useAdmin } from "@/contexts/superadmin/superadmin-admin-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
import { SkeletonLoader } from "@/components/layout/skeleton-loader";

export default function AdminsTable() {
  const { admins, loading } = useAdmin();

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
        {loading ? (
          <SkeletonLoader />
        ) : (
          <DataTable columns={columns} data={admins} />
        )}
      </CardContent>
    </Card>
  );
}