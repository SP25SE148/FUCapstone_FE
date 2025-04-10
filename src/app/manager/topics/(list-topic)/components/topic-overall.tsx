"use client";

import { useManagerTopics } from "@/contexts/manager/manager-topic-context";

import OverallStats from "@/components/layout/overall-stats";

export default function TopicOverall() {
  const { topics } = useManagerTopics();
  
  const items = [
    { title: "Total Topics", stat: topics.length },
    { title: "Pending Topics", stat: topics.filter(topic => topic.status === "Pending").length },
    { title: "Approved Topics", stat: topics.filter(topic => topic.status === "Approved").length },
    { title: "Rejected Topics", stat: topics.filter(topic => topic.status === "Rejected").length },
  ];

  return (
    OverallStats({ items })
  );
}