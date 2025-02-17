"use client";
import { topics } from "@/app/student/topics/data-table";
import OverallStats from "@/components/layout/overall-stats";

export default function TopicOverallStats() {

  const unassignedTopic = topics.filter(campus => campus.status === "Unassigned");
  const assignedTopic = topics.filter(campus => campus.status !== "Unassigned");

  const items = [
    { title: "Total Topics", stat: topics.length },
    { title: "Unassigned Topics", stat: unassignedTopic.length },
    { title: "Assigned Topics", stat: assignedTopic.length }
  ];

  return (
    OverallStats({ items })
  );
}