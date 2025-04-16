import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircleMore, MessageCirclePlus, RotateCw, User2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { ReviewResult } from "@/types/types";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DetailItem({ result }: { result: ReviewResult }) {
    const [showDetail, setShowDetail] = useState<boolean>(false);

    return (
        <Card>
            <div
                onClick={() => { setShowDetail(!showDetail) }}
                className={cn(
                    `flex items-center justify-between bg-primary/20 rounded-t-xl cursor-pointer select-none`,
                    !showDetail && "rounded-xl"
                )}
            >
                <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                        <RotateCw className="size-4 text-primary" />
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">Review {result?.attempt}</CardTitle>
                    </div>
                </CardHeader>
                {showDetail ? <ChevronUp className="size-4 text-primary mr-4" /> : <ChevronDown className="size-4 text-primary mr-4" />}
            </div>
            {showDetail && <CardContent className="p-4 space-y-4">
                {result.reviewCalendarResultDetailList.map((review, reviewIndex) => (
                    <Card key={reviewIndex} className="bg-primary/5">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex items-center gap-3">
                                <Avatar className="size-8 border-2 border-primary">
                                    <AvatarFallback className="bg-primary/10">
                                        <User2 className="size-5 text-primary" />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-semibold text-primary">{review?.author}</p>
                                    <p className="text-xs text-muted-foreground">Reviewer {reviewIndex + 1}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-sm flex items-center gap-2 text-primary">
                                    <MessageCircleMore className="size-4 text-primary" />
                                    Comment(s)
                                </h3>
                                <div className="ml-2 text-sm">
                                    {review.comment === "undefined" ? (
                                        <span className="text-muted-foreground italic">No comment provided</span>
                                    ) : (
                                        <p className="font-semibold tracking-tight text-justify">{review.comment}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-sm flex items-center gap-2 text-primary">
                                    <MessageCirclePlus className="size-4 text-primary" />
                                    Suggestion(s)
                                </h3>
                                <div className="ml-2 text-sm">
                                    {review.suggestion === "undefined" ? (
                                        <span className="text-muted-foreground italic">No suggestion provided</span>
                                    ) : (
                                        <p className="font-semibold tracking-tight text-justify">{review.suggestion}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>}
        </Card>
    )
}