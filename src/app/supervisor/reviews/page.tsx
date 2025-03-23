"use client"

import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { useSupervisorReview } from "@/contexts/supervisor/supervisor-review-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewsPage() {
    const { reviewCalendar } = useSupervisorReview();

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Reviews</CardTitle>
                <CardDescription>Reviews schedule and information.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={reviewCalendar || []} />
            </CardContent>
        </Card>
    )
}