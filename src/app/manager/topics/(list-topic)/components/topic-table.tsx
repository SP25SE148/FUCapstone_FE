"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useManagerTopics } from "@/contexts/manager/manager-topic-context";

export default function TopicTable() {
  const { topics } = useManagerTopics();

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl">Manage Topics</CardTitle>
        <CardDescription>List of topics managed by the manager</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={topics || []} />
      </CardContent>
    </Card>
  );
}