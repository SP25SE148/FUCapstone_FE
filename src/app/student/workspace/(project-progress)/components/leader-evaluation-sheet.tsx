"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useStudentTasks } from "@/contexts/student/student-task-context";

interface LeaderEvaluationSheetProps {
  data: {
    projectProgressId: string;
    projectProgressWeekId: string;
  };
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

export default function LeaderEvaluationSheet({ data, open, onClose, refresh }: LeaderEvaluationSheetProps) {
  const { submitSummaryWeekForLeader } = useStudentTasks();
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        ProjectProgressId: data.projectProgressId,
        ProjectProgressWeekId: data.projectProgressWeekId,
        Summary: summary,
      };
      await submitSummaryWeekForLeader(requestBody);
      setOpenConfirm(false);
      onClose();
      refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-2/3 sm:max-w-2/3 overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="font-semibold tracking-tight text-xl text-primary">
              Leader Evaluation Week
            </SheetTitle>
            <SheetDescription>Provide a summary for this week.</SheetDescription>
          </SheetHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your summary here..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <SheetFooter className="mt-6">
            <Button onClick={() => setOpenConfirm(true)} disabled={!summary.trim()}>
              Submit
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={openConfirm} onOpenChange={() => setOpenConfirm(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Please confirm before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={handleSubmit}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}