"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";

import { useAssignAppraisal } from "@/contexts/manager/manager-assign-appraisal-context";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function AddSupervisor() {
  const { selectedSupervisors, assignAppraisalTopic, clearSelectedSupervisors } = useAssignAppraisal();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleAssign = async () => {
    await assignAppraisalTopic();
    setOpen(false);
    router.push("/manager/topics");
    clearSelectedSupervisors();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90" disabled={selectedSupervisors.length < 2}>
          <CirclePlus />
          Assign
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Assignment</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to assign the selected supervisors?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAssign}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}