"use client"

import { useEffect, useState } from "react"
import { CalendarRange } from "lucide-react"

import { Semester } from "@/types/types"
import { useSuperadminDashboard } from "@/contexts/superadmin/superadmin-dashboard-context"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

export default function SelectSemester() {
    const { semesters, getDashboard } = useSuperadminDashboard()
    const [selectedSemester, setSelectedSemester] = useState<string | undefined>()

    useEffect(() => {
        if (semesters && semesters.length > 0) {
            setSelectedSemester(semesters[0].id)
        }
    }, [semesters])

    useEffect(() => {
        if (selectedSemester) {
            getDashboard(selectedSemester)
        }
    }, [selectedSemester])

    return (
        <Card>
            <CardHeader className="bg-primary/10 rounded-t-xl">
                <CardTitle className="font-semibold tracking-tight text-xl text-primary flex items-center gap-2">
                    <CalendarRange className="h-5 w-5 text-primary" />
                    Dashboard Period
                </CardTitle>
                <CardDescription>Select a semester to view its dashboard data</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <h3 className="text-sm text-muted-foreground">Semester:</h3>
                    {semesters ? (
                        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger className="w-[240px]">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {semesters?.map((semester: Semester, index) => (
                                    <SelectItem key={index} value={semester.id}>
                                        <strong>{semester.id}</strong> - <span className="text-muted-foreground text-xs">{semester.name}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <Skeleton className="h-10 w-[240px]" />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
