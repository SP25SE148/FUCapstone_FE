import { useState } from "react";
import { CalendarIcon, ChevronDown, ChevronUp, ClipboardIcon, RefreshCw, UserIcon } from "lucide-react";

import { cn, getDate } from "@/lib/utils";
import { TopicAppraisal } from "@/types/types";
import { getTopicAppraisalStatus2 } from "@/utils/statusUtils";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppraisalDetailsItem({ appraisal }: { appraisal: TopicAppraisal }) {
    const [showDetail, setShowDetail] = useState<boolean>(false);

    return (
        <Card>
            <div
                onClick={() => { setShowDetail(!showDetail) }}
                className={cn(
                    `flex items-center justify-between bg-primary/5 rounded-t-xl cursor-pointer`,
                    !showDetail && "rounded-xl"
                )}
            >
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-primary flex items-center gap-2">Appraisal {getTopicAppraisalStatus2(Number(appraisal?.status))}</CardTitle>
                </CardHeader>
                {showDetail ? <ChevronUp className="size-4 text-primary mr-4" /> : <ChevronDown className="size-4 text-primary mr-4" />}
            </div>
            {showDetail && <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                            <RefreshCw className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Attempt</p>
                            <p className="font-semibold tracking-tight">{appraisal.attemptTime}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                            <UserIcon className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Appraiser</p>
                            <p className="font-semibold tracking-tight">{appraisal.supervisorId}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                            <CalendarIcon className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Created Date</p>
                            <p className="font-semibold tracking-tight">{appraisal.createdDate && getDate(appraisal.createdDate)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                            <CalendarIcon className="size-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Appraisal Date</p>
                            <p className="font-semibold tracking-tight">{appraisal.appraisalDate && getDate(appraisal.appraisalDate)}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                            <ClipboardIcon className="size-4 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">Content</p>
                    </div>
                    <div className="ml-10 p-3 bg-muted rounded-md">
                        {appraisal.appraisalContent ? (
                            <p className="font-semibold tracking-tight">{appraisal.appraisalContent}</p>
                        ) : (
                            <p className="text-muted-foreground italic font-semibold tracking-tight">No content yet</p>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                            <ClipboardIcon className="size-4 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">Comment</p>
                    </div>
                    <div className="ml-10 p-3 bg-muted rounded-md">
                        {appraisal.appraisalComment ? (
                            <p className="font-semibold tracking-tight">{appraisal.appraisalComment}</p>
                        ) : (
                            <p className="text-muted-foreground italic font-semibold tracking-tight">No comment yet</p>
                        )}
                    </div>
                </div>
            </CardContent>}
        </Card>
    )
}