"use client"

import { useStudentReview } from "@/contexts/student/student-review-context";

import NoResult from "./components/no-result";
import ReviewItem from "./components/review-item";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewsPage() {
    const { reviewCalendar } = useStudentReview();
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Reviews</CardTitle>
                <CardDescription>Reviews schedule and information.</CardDescription>
            </CardHeader>
            {reviewCalendar ?
                <CardContent className="space-y-4">
                    {reviewCalendar?.map((calendar) => (
                        <ReviewItem key={calendar?.id} calendar={calendar} />
                    ))}
                </CardContent>
                :
                <NoResult />
            }
        </Card>
    )
}