"use client";

import { CalendarIcon } from "lucide-react";
import { format, isBefore, startOfDay } from "date-fns";

import { cn } from "@/lib/utils";
import { Task } from "@/types/types";
import { useStudentTasks } from "@/contexts/student/student-task-context";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";

interface UpdateDueDateProps {
  task: Task;
  onClose: () => void;
} 

export default function UpdateDueDate({ task, onClose }: UpdateDueDateProps) {
  const [date, setDate] = useState<Date | undefined>(
    undefined
  );
  // const [date, setDate] = useState<string>("");
  const { updateTask, getProjectProgressOfGroup, groupInfo } = useStudentTasks();

  useEffect (() => {
    if (task.dueDate) {
      setDate(new Date(task.dueDate));
    }
  }, [task]);
  

  const handleDateChange = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);

    const projectProgress = groupInfo?.id
      ? await getProjectProgressOfGroup(groupInfo.id)
      : null;

    if (selectedDate && projectProgress?.id) {
      await updateTask({
        ...task,
        projectProgressId: projectProgress.id,
        dueDate: selectedDate.toISOString(),
      });
    }

    onClose();
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          disabled={(date) => isDateDisabled(date)}
        />
      </PopoverContent>
    </Popover>
  );
}