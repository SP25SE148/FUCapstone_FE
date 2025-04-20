"use client";

import { useCapstone } from "@/contexts/superadmin/superadmin-capstone-context";

import AddCapstone from "@/app/superadmin/capstones/component/add-capstone";

import { DataTable } from "@/components/ui/data-table";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";
import { columns } from "@/app/superadmin/capstones/component/capstone-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

export default function CapstoneTable() {
  const { capstones, loading } = useCapstone();

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Capstones
          </CardTitle>
          <CardDescription>List of FPT University capstones</CardDescription>
        </CardHeader>
        <AddCapstone />
      </div>
      <CardContent>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <DataTable columns={columns} data={capstones.slice().reverse()} />
        )}
      </CardContent>
    </Card>
  );
}