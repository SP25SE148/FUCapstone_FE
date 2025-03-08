"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/student/topics/components/topic-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStudentTopics } from "@/contexts/student/student-topic-context";
import { useStudentProfile } from "@/contexts/student/student-profile-context";
import CreateGroup from "@/app/student/topics/components/create-group";

export default function TopicTable() {
  const { topics } = useStudentTopics();
  const { studentProfile } = useStudentProfile();


  if (!studentProfile?.isHaveBeenJoinGroup) {
    return <CreateGroup />;
  }

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
        <DataTable columns={columns} data={topics} />
      </CardContent>
    </Card>
  );
}