import Link from "next/link";
import { useState } from "react";
import { CirclePlus, Users } from "lucide-react";

import { useStudentGroup } from "@/contexts/student/student-group-context";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function CreateGroup() {
    const { createGroup } = useStudentGroup();
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCreateGroup = async () => {
        setIsLoading(true);
        try {
            await createGroup();
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
                <div className="flex flex-col items-center justify-center gap-8">
                    <Users className="size-20 text-primary" />
                    <div className="space-y-2">
                        <p className="text-2xl font-bold text-center">
                            You are not currently in any groups.
                        </p>
                        <p className="text-muted-foreground text-center">
                            Please check the <Link href={"/student/groups/my-request"} className="text-primary hover:underline hover:underline-offset-2">My Request</Link> section or create a group for yourself.
                        </p>
                    </div>
                    <Button
                        className="transition-all hover:scale-105"
                        onClick={() => setOpen(true)}
                    >
                        <CirclePlus />
                        CREATE GROUP
                    </Button>
                </div>
            </Card>

            {/* comfirm */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Please check again before continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={isLoading} onClick={handleCreateGroup}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}