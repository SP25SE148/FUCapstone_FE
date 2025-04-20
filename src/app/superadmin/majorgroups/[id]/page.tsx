"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useMajorGroup, SuperadminMajorGroupProvider, } from "@/contexts/superadmin/superadmin-majorgroup-context";

import { DataTable } from "@/components/ui/data-table";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";
import { majorColumns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import AddMajor from "@/app/superadmin/majorgroups/component/add-major";

function MajorPageContent() {
  const params = useParams();
  const groupId = params.id as string;
  const { getMajorsByMajorGroupId, loading, majors } = useMajorGroup();

  useEffect(() => {
    getMajorsByMajorGroupId(groupId);
  }, []);

  return (
    <div>
      <div className="mb-4 p-4 bg-background rounded-xl border shadow">
        <h2 className="text-2xl font-semibold">{groupId} - Majors</h2>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Majors
            </CardTitle>
            <CardDescription>
              List of majors in the selected major group
            </CardDescription>
          </CardHeader>
          <AddMajor majorGroupId={groupId} />
        </div>
        <CardContent>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <DataTable columns={majorColumns} data={majors.slice().reverse()}/>
          )}
        </CardContent>
      </Card >
    </div >
  );
}

export default function MajorPage() {
  return (
    <SuperadminMajorGroupProvider>
      <MajorPageContent />
    </SuperadminMajorGroupProvider>
  );
}
