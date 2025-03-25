import TopicTable from "@/app/student/topics/components/topic-table";
import { StudentTopicProvider } from "@/contexts/student/student-topic-context";

export default function TopicsPage() {
  return (
    <StudentTopicProvider>
      <TopicTable />
    </StudentTopicProvider>
  );
}
