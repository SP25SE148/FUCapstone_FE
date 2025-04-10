"use client";

import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-context";

import AddMajorGroup from "@/app/superadmin/majorgroups/component/add-majorgroup";

import { DataTable } from "@/components/ui/data-table";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";
import { columns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

export default function MajorGroupTable() {
  const { majorGroups, loading } = useMajorGroup();

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Major Groups
          </CardTitle>
          <CardDescription>List of FPT University Major Groups</CardDescription>
        </CardHeader>
        <AddMajorGroup />
      </div>
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