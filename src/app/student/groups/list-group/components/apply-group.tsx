import { useState } from "react";
import { Send } from "lucide-react";

import { GroupFullInfo } from "@/types/types";
import { useStudentListGroup } from "@/contexts/student/student-list-group-context";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"

export default function ApplyGroup({ group, onClose }: { group: GroupFullInfo, onClose: () => void }) {
    const { createJoinGroupRequest } = useStudentListGroup();
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const res = await createJoinGroupRequest({ GroupId: group?.id });
            if (res.isSuccess) {
                onClose()
            }
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <Button onClick={() => { setOpen(true) }}>
                <Send />
                Apply
            </Button>

            {/* confirm */}
            <AlertDialog open={open} onOpenChange={() => { setOpen(false) }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Please check again before continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={isLoading} onClick={handleConfirm}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}