"use client";

import { columns, Topic } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useManagerTopics } from "@/contexts/manager/manager-topic-context";

export default function TopicTable() {
  const { topics, loading } = useManagerTopics();

  const data: Topic[] = topics.map((topic) => ({
    id: topic.id,
    code: topic.code,
    mainSupervisorName: topic.mainSupervisorName,
    mainSupervisorEmail: topic.mainSupervisorEmail,
    englishName: topic.englishName,
    vietnameseName: topic.vietnameseName,
    abbreviation: topic.abbreviation,
    description: topic.description,
    fileName: topic.fileName,
    fileUrl: topic.fileUrl,
    status: topic.status,
    difficultyLevel: topic.difficultyLevel,
    businessAreaName: topic.businessAreaName,
    capstoneId: topic.capstoneId,
    semesterId: topic.semesterId,
    campusId: topic.campusId,
    createdDate: topic.createdDate,
    coSupervisors: topic.coSupervisors,
    topicAppraisals: topic.topicAppraisals,
  }));

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl">Manage Topics</CardTitle>
        <CardDescription>List of topics managed by the manager</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}