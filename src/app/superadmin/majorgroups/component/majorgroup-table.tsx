"use client";

<<<<<<< HEAD
import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-context";
=======
import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
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