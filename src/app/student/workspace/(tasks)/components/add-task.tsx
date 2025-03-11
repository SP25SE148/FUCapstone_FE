"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Task } from "@/contexts/student/student-task-context";

interface AddTaskProps {
  onClose: () => void;
  onAdd: (task: Task) => void;
}

export default function AddTask({ onClose, onAdd }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState<string>("");

  const handleAdd = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      assignedTo,
      status: "Todo",
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    onAdd(newTask);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Enter the title and assign a person to this task.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select onValueChange={setAssignedTo} value={assignedTo}>
          <SelectTrigger>
            <span>{assignedTo || "Select a person"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Person 1">Person 1</SelectItem>
            <SelectItem value="Person 2">Person 2</SelectItem>
            <SelectItem value="Person 3">Person 3</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}