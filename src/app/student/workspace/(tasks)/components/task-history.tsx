"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TaskHistoryProps {
  onClose: () => void;
}

export default function TaskHistory({ onClose }: TaskHistoryProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task History</DialogTitle>
          <DialogDescription>
            View the history of all changes made to tasks.
          </DialogDescription>
        </DialogHeader>
        <div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}