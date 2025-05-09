import TopicTable from "./components/topic-table";
import { SupervisorTopicProvider } from "@/contexts/supervisor/supervisor-topic-context";

export default function MyTopicsPage() {
    return (
        <SupervisorTopicProvider>
            <TopicTable />
        </SupervisorTopicProvider>
    )
}