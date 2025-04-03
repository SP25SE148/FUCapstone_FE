import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronUp, Users } from "lucide-react";

import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function CoManage() {
    const { coGroupList } = useSupervisorGroup();
    const router = useRouter();
    const [showMore, setShowMore] = useState<boolean>(true);

    return (
        <div className="space-y-4">
            <h3
                className="font-semibold flex items-center gap-2 cursor-pointer"
                onClick={() => {
                    setShowMore(!showMore)
                }}
            >
                <Users className="size-4 text-primary" />
                Co-Manage
                {showMore && coGroupList?.length > 0 ? <ChevronUp className="size-5 text-primary" /> : <ChevronDown className="size-5 text-primary" />}
            </h3>
            {showMore && coGroupList?.length > 0 && <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
                {coGroupList?.map((group, index) => (
                    <Card
                        key={index}
                        className="relative h-60 p-6 select-none cursor-pointer overflow-hidden bg-primary/5 hover:bg-primary/10"
                        onClick={() => { router.push(`/supervisor/groups/${group?.groupId}`) }}
                    >
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">{group?.englishName}</CardTitle>
                        <CardDescription>{group?.groupCode}</CardDescription>
                        <div className="absolute bottom-4 flex items-center gap-2 font-semibold text-sm text-primary hover:text-blue-400">Go to workspace <ArrowRight className="size-4" /></div>
                    </Card>
                ))}
            </div>}
        </div>
    )
}