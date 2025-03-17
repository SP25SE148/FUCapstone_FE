import TopicTable from "./components/topic-table";
import TopicOverall from "./components/topic-overall";

export default function ManagerManageTopicsPage() {
  return (
      <div className="flex flex-col gap-4">
        <TopicOverall />
        <TopicTable />
      </div>
  );
}