import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronUp, User } from "lucide-react";

import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function MainManage() {
    const { groupList } = useSupervisorGroup();
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
                <User className="size-4 text-primary" />
                Main Manage
                {showMore && groupList?.length > 0 ? <ChevronUp className="size-5 text-primary" /> : <ChevronDown className="size-5 text-primary" />}
            </h3>
            {showMore && groupList?.length > 0 && <div className="grid grid-cols-3 gap-4">
                {groupList?.map((group, index) => (
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