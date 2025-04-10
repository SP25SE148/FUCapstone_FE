"use client";

import { CirclePlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Major } from "@/types/types";
import { useMajorGroup, SuperadminMajorGroupProvider, } from "@/contexts/superadmin/superadmin-majorgroup-context";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";
import { majorColumns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

function MajorPageContent() {
  const params = useParams();
  const groupId = params.id as string;
  const { getMajorsByMajorGroupId, addMajor, updateMajor, removeMajor } = useMajorGroup();
  const [loading, setLoading] = useState(true);
  const [majors, setMajors] = useState<Major[]>([]);

  const fetchMajors = async () => {
    setLoading(true);
    try {
      const data: Major[] = await getMajorsByMajorGroupId(groupId);
      setMajors(data);
    } catch (err) {
      console.error("Error fetching majors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, [getMajorsByMajorGroupId, groupId, updateMajor, addMajor, removeMajor]);

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
          <Button className="mr-6">
            <CirclePlus />
            Add
          </Button>
        </div>
        <CardContent>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <DataTable columns={majorColumns} data={majors} />
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
