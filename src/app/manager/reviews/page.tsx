"use client"

import { useManagerReview } from "@/contexts/manager/manager-review-context"

import UploadReviewCalendar from "./components/upload-review-calendar"

import { columns } from "./components/columns"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"

export default function ReviewsPage() {
    const { reviewCalendar } = useManagerReview()
    return (
        <Card className="min-h-[calc(100vh-96px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Reviews</CardTitle>
                    <CardDescription>Review schedule and information.</CardDescription>
                </CardHeader>
                <UploadReviewCalendar />
            </div>
            <CardContent>
                <DataTable columns={columns} data={reviewCalendar || []} />
            </CardContent>
        </Card>
    )
}