import { getDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewCalendar } from "@/contexts/student/student-review-context";

export default function ReviewItem({ calendar }: { calendar: ReviewCalendar }) {
    return (
        <Card className="bg-primary/5">
            <CardContent className="p-4 grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Attemp</div>
                    <div className="pl-2 font-semibold">{calendar?.attempt}</div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Reviewer 1</div>
                    <div className="pl-2 font-semibold">{calendar?.reviewersCode?.[0]}</div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Reviewer 2</div>
                    <div className="pl-2 font-semibold">{calendar?.reviewersCode?.[1]}</div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Date</div>
                    <div className="pl-2 font-semibold text-primary flex items-center gap-2">
                        <CalendarIcon className="size-4" />
                        {getDate(calendar?.date)?.split(" ")?.[0]}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Slot</div>
                    <div className="pl-2 font-semibold">{calendar?.slot}</div>
                </div>
                <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Room</div>
                    <div className="pl-2 font-semibold">{calendar?.room}</div>
                </div>
            </CardContent>
        </Card>
    )
}