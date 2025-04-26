import { useState } from "react";
import { BadgeInfoIcon, ChevronDown, ChevronUp, FileCheck, ShieldAlert, ShieldCheck, ShieldEllipsis, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { DefenseResult } from "@/types/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDefenseStatus, getGroupStatus, getReDefenseStatus } from "@/utils/statusUtils";

export default function DetailItem({ result }: { result: DefenseResult }) {
    const [showDetail, setShowDetail] = useState<boolean>(true);

    return (
        <Card
            className="cursor-pointer select-none hover:shadow-md transition-all"
            onClick={() => { setShowDetail(!showDetail) }}
        >
            <div
                className={cn(
                    `flex items-center justify-between bg-primary/20 rounded-t-xl`,
                    !showDetail && "rounded-xl"
                )}
            >
                <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-primary" />
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">Defense {result?.defendAttempt}</CardTitle>
                        {getDefenseStatus(result?.status)}
                    </div>
                </CardHeader>
                {showDetail ? <ChevronUp className="size-4 text-primary mr-4" /> : <ChevronDown className="size-4 text-primary mr-4" />}
            </div>
            {showDetail && <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                        <ShieldAlert className="size-4 text-primary" />
                        General Result
                    </h3>
                    <Card className="bg-primary/5">
                        <CardContent className="p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-md p-2">
                                        <Users className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">Group Code</h3>
                                        <p className="font-semibold tracking-tight">
                                            {result?.groupCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-md p-2">
                                        <FileCheck className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">Topic Code</h3>
                                        <p className="font-semibold tracking-tight">
                                            {result?.topicCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-md p-2">
                                        <BadgeInfoIcon className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">Group Status</h3>
                                        {getGroupStatus(result?.groupStatus)}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-md p-2">
                                        <ShieldEllipsis className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">Need the 2nd defense</h3>
                                        {getReDefenseStatus(result?.isReDefendCapstone)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>}
        </Card>
    )
}