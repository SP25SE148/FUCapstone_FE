import { BookText } from "lucide-react";

import { ReviewCriteria } from "@/types/types";

import { Card, CardContent } from "@/components/ui/card";

export default function ReviewCriteriaList({ reviewCriteria }: { reviewCriteria: ReviewCriteria[] }) {
    return (
        <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
                <BookText className="size-4 text-primary" />
                Review Criteria
            </h3>
            <Card className="bg-primary/5">
                <CardContent className="p-6 grid grid-cols-2 gap-4">
                    {reviewCriteria?.map((criteria: ReviewCriteria, index: number) => (
                        <p key={index} className="font-semibold tracking-tight">
                            {index + 1}. {criteria?.name}: <span className="text-sm text-muted-foreground">{criteria?.description}</span><br />
                            - {criteria?.requirement}
                        </p>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}