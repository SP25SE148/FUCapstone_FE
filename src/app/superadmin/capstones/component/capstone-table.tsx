"use client";

import { useCapstone } from "@/contexts/capstone-context";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/capstones/component/capstone-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddCapstone from "@/app/superadmin/capstones/component/add-capstone";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";

export default function CapstoneTable() {
  const { capstones, loading } = useCapstone();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Capstones
            </CardTitle>
            <CardDescription>List of FPT University capstones</CardDescription>
          </div>
          <AddCapstone />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <DataTable columns={columns} data={capstones} />
        )}
      </CardContent>
    </Card>
  );
}