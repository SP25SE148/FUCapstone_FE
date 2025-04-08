"use client"

import { useState } from "react";
import { saveAs } from "file-saver";
import { BookOpen, Download, School } from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { useManagerDashboard } from "@/contexts/manager/manager-dashboard-context";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default function InfoArchive() {
    const { user } = useAuth();
    const { archiveData } = useManagerDashboard();

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

    return (
        <Card>
            <CardContent className="p-6 flex items-center justify-between">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                        <School className="size-4 text-primary" />
                        <p className="text-sm font-medium flex items-center gap-2">
                            Campus:
                            <span className="text-base font-bold text-primary">{user?.CampusId}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-primary" />
                        <p className="text-sm font-medium flex items-center gap-2">
                            Capstone:
                            <span className="text-base font-bold text-primary">{user?.CapstoneId}</span>
                        </p>
                    </div>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="hover:bg-red-600 hover:text-white"
                        >
                            <Download />
                            Archive Data
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
            </CardContent>
        </Card>
    )
}