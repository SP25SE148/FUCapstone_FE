"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/student/topics/components/topic-table-columns";
import { topics } from "@/app/student/topics/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TopicTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Topics
            </CardTitle>
            <CardDescription>
              List of Graduation Project Topics that students can register for
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* {loading ? (
          <SkeletonLoader />
        ) : ( */}
        <DataTable columns={columns} data={topics} />
        {/* )} */}
      </CardContent>
    </Card>
  );
}
