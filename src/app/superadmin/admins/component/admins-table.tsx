"use client";

import { useAdmin } from "@/contexts/superadmin/superadmin-admin-context";

import AddAdmin from "@/app/superadmin/admins/component/add-admin";

import { DataTable } from "@/components/ui/data-table";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";
import { columns } from "@/app/superadmin/admins/component/admins-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

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