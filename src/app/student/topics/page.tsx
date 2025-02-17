import TopicOverallStats from "@/app/student/topics/components/topic-overall-stats";
import TopicTable from "@/app/student/topics/components/topic-table";

export default function TopicsPage() {
  return (
    <div className="flex flex-col gap-4">
      <TopicOverallStats />
      <TopicTable />
    </div>
  );
}
