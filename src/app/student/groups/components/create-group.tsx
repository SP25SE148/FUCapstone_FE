"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { students } from "@/app/student/groups/types/student";
import { Check, ChevronsUpDown, User2, X } from "lucide-react";

export function CreateGroup() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [invitedStudents, setInvitedStudents] = useState<string[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  const currentUser = {
    name: "Nguyen Duc Thang",
    major: "Software EngineEngineering",
    campus: "Ho Chi Minh",
    semester: "Spring 25",
    capstone: "SEP490",
    groupCode: "FFFFFF",
  };

  const filteredStudents = students.filter(
    (student) =>
      student.semester === currentUser.semester &&
      student.capstone === currentUser.capstone &&
      student.campus === currentUser.campus &&
      !invitedStudents.includes(student.email)
  );

  const handleInvite = () => {
    if (value && !invitedStudents.includes(value)) {
      setInvitedStudents([...invitedStudents, value]);
      setValue("");
      setOpen(false);
      toast.success("Invitation sent successfully!");
    }
  };

  const handleDelete = (email: string) => {
    setInvitedStudents(invitedStudents.filter((e) => e !== email));
    setDeleteDialog(null);
    toast.success("Member removed successfully!");
  };

  return (
    <div>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Create Group</h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="border-primary">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    <User2 className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-md">
                    {currentUser.name} - Leader
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-md font-bold">
                  Group Code:{" "}
                  <span className="font-medium ">{currentUser.groupCode}</span>
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-md">
              <div>
                <p className="font-bold">
                  Major:{" "}
                  <span className="font-normal ">{currentUser.major}</span>
                </p>
                <p className="font-bold">
                  Campus:{" "}
                  <span className="font-normal ">{currentUser.campus}</span>
                </p>
              </div>
              <div>
                <p className="font-bold">
                  Semester:{" "}
                  <span className="font-normal ">{currentUser.semester}</span>
                </p>
                <p className="font-bold">
                  Capstone:{" "}
                  <span className="font-normal ">{currentUser.capstone}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium my-2">Invite Member</h3>
            <div className="flex gap-2 w-full justify-between">
              <div className="flex gap-2 w-3/5">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {value
                        ? value
                        : "Enter the email of the student you want to invite"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command className="w-full">
                      <CommandInput placeholder="Search student email..." />
                      <CommandList>
                        <CommandEmpty>No student found.</CommandEmpty>
                        <CommandGroup>
                          {filteredStudents.map((student) => (
                            <CommandItem
                              key={student.email}
                              value={student.email}
                              onSelect={(currentValue) => {
                                setValue(currentValue);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  value === student.email
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {student.email}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button className="border border-primary bg-background text-primary hover:bg-muted" onClick={handleInvite}>Send request</Button>
              </div>
              <Button className="bg-primary text-white">Create Group</Button>
            </div>
          </div>
        </div>

        {invitedStudents.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Students invited</h3>
            <div className="space-y-2 overflow-y-auto max-h-60">
              {invitedStudents.map((email) => (
                <div
                  key={email}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <User2 className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span>{email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteDialog(email)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <AlertDialog
          open={!!deleteDialog}
          onOpenChange={() => setDeleteDialog(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the member from your group. This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteDialog && handleDelete(deleteDialog)}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </div>
  );
}
