import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronUp, User } from "lucide-react";

import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
                        className="relative h-60 select-none  overflow-hidden cursor-pointer transition-all duration-300 border border-primary bg-primary/5 hover:bg-primary/10"
                        onClick={() => router.push(`/supervisor/groups/${group?.groupId}`)}
                    >
                        <CardHeader className="pb-2">
                            <CardTitle className="font-semibold tracking-tight text-xl text-primary">{group?.englishName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="bg-primary/5 text-primary hover:bg-primary/10">
                                    Semester: {group?.semesterCode}
                                </Badge>
                                <Badge variant="outline" className="bg-primary/5 text-primary hover:bg-primary/10">
                                    Group: {group?.groupCode}
                                </Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="absolute bottom-0 w-full p-4 pt-8">
                            <div className="flex items-center gap-2 font-medium text-sm text-primary group w-full">
                                <span className="group-hover:underline transition-all">Go to workspace</span>
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>}
        </div>
    )
}