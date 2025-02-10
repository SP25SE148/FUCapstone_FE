"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { majorColumns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMajorGroup, MajorGroupProvider } from "@/contexts/majorgroup-context";

interface Major {
  id: string;
  majorGroupId: string;
  name: string;
  description: string;
  isDeleted: boolean;
  deletedAt: string | null;
}

function MajorPageContent() {
  const params = useParams();
  const groupId = params.id as string; 
  const { getMajorsByMajorGroupId } = useMajorGroup();
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMajors = async () => {
      setLoading(true);
      try {
        const data: Major[] = await getMajorsByMajorGroupId(groupId);
        setMajors(data);
      } catch (err) {
        console.error('Error fetching majors:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, [getMajorsByMajorGroupId, groupId]);

  if (loading) {
    return <div>Loading majors...</div>;
  }

  if (error) {
    return (
      <strong>
        Error loading majors: {error.message}
      </strong>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="p-4 rounded-lg bg-background">
          <h2 className="text-2xl font-semibold mb-4">
            {groupId} - Majors
          </h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-semibold tracking-tight text-xl">
                Majors
              </CardTitle>
              <CardDescription>
                List of majors in the selected major group
              </CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Add Major
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={majorColumns} data={majors} />
        </CardContent>
      </Card>
    </div>
  );
}

export default function MajorPage() {
  return (
    <MajorGroupProvider>
      <MajorPageContent />
    </MajorGroupProvider>
  );
}