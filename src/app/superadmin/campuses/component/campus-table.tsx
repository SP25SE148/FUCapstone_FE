"use client";

import { useCampus } from "@/contexts/superadmin/superadmin-campus-context";

import AddCampus from "./add-campus";

import { DataTable } from "@/components/ui/data-table";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";
import { columns } from "@/app/superadmin/campuses/component/campus-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

export default function CampusTable() {
  const { campuses, loading } = useCampus();

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Campuses
          </CardTitle>
          <CardDescription>List of FPT University campuses</CardDescription>
        </CardHeader>
        <AddCampus />
      </div>
      <CardContent>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <DataTable columns={columns} data={campuses} />
        )}
      </CardContent>
    </Card>
  );
}