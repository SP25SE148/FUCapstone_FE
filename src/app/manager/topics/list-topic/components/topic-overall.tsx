"use client";

import OverallStats from "@/components/layout/overall-stats";
import { useManagerTopics } from "@/contexts/manager/manager-topic-context";

export default function TopicOverall() {
  const { topics } = useManagerTopics();
  const items = [
    { title: "Total Topics", stat: topics.length },
    { title: "Pending Topics", stat: topics.filter(topic => topic.status === 0).length },
    { title: "Approved Topics", stat: topics.filter(topic => topic.status === 1).length },
    { title: "Rejected Topics", stat: topics.filter(topic => topic.status === 2).length },
  ];

  return (
    OverallStats({ items })
  );
}