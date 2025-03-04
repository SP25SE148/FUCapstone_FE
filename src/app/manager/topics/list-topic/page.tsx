import TopicTable from "./components/topic-table";
import TopicOverall from "./components/topic-overall";
import { ManagerTopicProvider } from "@/contexts/manager/manager-topic-context";

export default function ManagerManageTopicsPage() {
  return (
    <ManagerTopicProvider>
      <div className="flex flex-col gap-4">
        <TopicOverall />
        <TopicTable />
      </div>
    </ManagerTopicProvider>
  );
}