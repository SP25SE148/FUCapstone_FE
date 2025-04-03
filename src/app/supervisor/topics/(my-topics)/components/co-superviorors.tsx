import { useState } from "react";
import { ChevronDown, ChevronUp, Users } from "lucide-react";

import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function CoSupervisors() {
    const { topicsOfCoSupervisor } = useSupervisorTopic();
    const [showMore, setShowMore] = useState<boolean>(true);

    return (
        <div className="space-y-2">
            <h3
                className="font-semibold flex items-center gap-2 cursor-pointer"
                onClick={() => {
                    setShowMore(!showMore)
                }}
            >
                <Users className="size-4 text-primary" />
                CoSupervisor(s)
                {showMore ? <ChevronUp className="size-5 text-primary" /> : <ChevronDown className="size-5 text-primary" />}
            </h3>
            {showMore && <DataTable columns={columns} data={topicsOfCoSupervisor || []} />}
        </div>
    )
}