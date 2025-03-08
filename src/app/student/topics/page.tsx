import TopicTable from "@/app/student/topics/components/topic-table";
import { StudentTopicProvider } from "@/contexts/student/student-topic-context";

export default function TopicsPage() {
  return (
    <StudentTopicProvider>
      <div className="flex flex-col gap-4">
        <TopicTable />
      </div>
    </StudentTopicProvider>
  );
}
