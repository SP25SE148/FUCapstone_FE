"use client"

import { saveAs } from "file-saver";
import { useEffect, useState } from "react"
import { BookOpen, Calendar, CalendarRange, Download, School } from "lucide-react"

import { Semester } from "@/types/types"
import { useAuth } from "@/contexts/auth-context"
import { useManagerDashboard } from "@/contexts/manager/manager-dashboard-context"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function SelectSemester() {
    const { user } = useAuth();
    const { semesters, getDashboard, archiveData } = useManagerDashboard()
    const [selectedSemester, setSelectedSemester] = useState<string | undefined>()
    const [isArchiving, setIsArchiving] = useState<boolean>(false);

    const handleArchiveData = async () => {
        setIsArchiving(true)
        try {
            const res = await archiveData();
            const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, `Archive_Data_${user?.CampusId}_${user?.CapstoneId}.xlsx`);
        } finally {
            setIsArchiving(false)
        }
    }
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-center text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="bg-muted rounded-md p-2">
                            <School className="size-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm text-muted-foreground">
                                Campus
                            </h3>
                            <p className="font-semibold tracking-tight">{user?.CampusId}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-muted rounded-md p-2">
                            <BookOpen className="size-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm text-muted-foreground">
                                Capstone
                            </h3>
                            <p className="font-semibold tracking-tight">{user?.CapstoneId}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-muted rounded-md p-2">
                            <Calendar className="size-5 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm text-muted-foreground">Semester:</h3>
                            {semesters ? (
                                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                                    <SelectTrigger className="w-fit">
                                        <SelectValue placeholder="Select semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {semesters?.map((semester: Semester, index: number) => (
                                            <SelectItem key={index} value={semester.id}>
                                                <strong>{semester.id}</strong> - <span className="text-muted-foreground text-xs">{semester.name}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Skeleton className="h-10 w-[180px]" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="bg-muted rounded-md p-2">
                            <Download className="size-5 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm text-muted-foreground">Archive Data:</h3>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className="hover:bg-red-600 hover:text-white"
                                    >
                                        <Download />
                                        Archive
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action just can do only ONE time. This will permanently delete data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel disabled={isArchiving}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            disabled={isArchiving}
                                            onClick={handleArchiveData}
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
