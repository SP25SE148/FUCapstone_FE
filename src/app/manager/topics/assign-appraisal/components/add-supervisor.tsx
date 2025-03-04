"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAssignAppraisal } from "@/contexts/manager/manager-assign-appraisal-context";

export default function AddSupervisor() {
  const { selectedSupervisors, assignAppraisalTopic, clearSelectedSupervisors } = useAssignAppraisal();
  const [open, setOpen] = useState(false);

  const handleAssign = async () => {
    await assignAppraisalTopic();
    setOpen(false);
    clearSelectedSupervisors();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90" disabled={selectedSupervisors.length < 2}>
          <CirclePlus />
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Assignment</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>Are you sure you want to assign the selected supervisors?</p>
          <Button className="w-full mt-4" onClick={handleAssign}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}