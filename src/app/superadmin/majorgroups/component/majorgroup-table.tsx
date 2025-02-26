"use client";

import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-management";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddMajorGroup from "@/app/superadmin/majorgroups/component/add-majorgroup";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";

export default function MajorGroupTable() {
  const { majorGroups, loading } = useMajorGroup();

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
          <AddMajorGroup />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <DataTable columns={columns} data={majorGroups} />
        )}
      </CardContent>
    </Card>
  );
}