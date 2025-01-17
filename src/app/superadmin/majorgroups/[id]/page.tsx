"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { majorData } from "@/app/superadmin/majorgroups/table-data";
import { DataTable } from "@/components/ui/data-table";
import { majorColumns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; 

export default function MajorPage() {
  const params = useParams();
  const groupId = params.id;
  const group = majorData.find((g) => g.id === groupId);

  if (!group) {
    return <p className="text-center mt-8">Major Group not found</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/superadmin/majorgroups"
          className="inline-flex items-center text-purple-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
        <div className="p-4 rounded-lg bg-background">
          <h2 className="text-2xl font-semibold mb-4">
            {group.name} - {group.code}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-full">
            {group.description}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-semibold tracking-tight text-xl">
                Major Groups
              </CardTitle>
              <CardDescription>
                List of FPT University Major Groups
              </CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Add Major Groups
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={majorColumns} data={group.majors} />
        </CardContent>
      </Card>
    </div>
  );
}
