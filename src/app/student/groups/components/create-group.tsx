"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { students } from "@/app/student/groups/types/student";
import { Check, ChevronsUpDown, User2, X, Users } from "lucide-react";

interface InvitedStudent {
  email: string;
  status: "processing" | "accepted" | "rejected";
}

export function CreateGroup() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [invitedStudents, setInvitedStudents] = useState<InvitedStudent[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  const currentUser = {
    name: "Nguyen Duc Thang",
    major: "Software Engineering",
    campus: "Ho Chi Minh",
    semester: "Spring 25",
    capstone: "SEP490",
    // groupCode: "FFFFFF",
  };

  const filteredStudents = students.filter(
    (student) =>
      student.semester === currentUser.semester &&
      student.capstone === currentUser.capstone &&
      student.campus === currentUser.campus &&
      !invitedStudents.some((invited) => invited.email === student.email)
  );

  const handleInvite = () => {
    if (value && !invitedStudents.some((invited) => invited.email === value)) {
      setInvitedStudents([
        ...invitedStudents,
        { email: value, status: "processing" },
      ]);
      setValue("");
      setOpen(false);
      toast.success("Invitation sent successfully!");
    }
  };

  const handleDelete = (email: string) => {
    setInvitedStudents(
      invitedStudents.filter((invited) => invited.email !== email)
    );
    setDeleteDialog(null);
    toast.success("Member removed successfully!");
  };

  const getStatusBadge = (status: InvitedStudent["status"]) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Processing
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-primary/5 to-background p-6">
      <Card className="w-full shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary">Create Group</h2>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Create Group
            </Button>
          </div>

          <div className="space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between border-b border-primary/20 pb-4 mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="h-8 w-8 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-xl text-primary">
                        {currentUser.name}
                      </p>
                      <p className="text-sm text-muted-foreground">Leader</p>
                    </div>
                  </div>
                  {/* <div className="bg-primary/10 px-4 py-2 rounded-full">
                    <p className="text-sm font-medium text-primary">
                      Group Code: <span className="font-bold">{currentUser.groupCode}</span>
                    </p>
                  </div> */}
                </div>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Major</p>
                    <p className="font-semibold">{currentUser.major}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Campus</p>
                    <p className="font-semibold">{currentUser.campus}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">
                      Semester
                    </p>
                    <p className="font-semibold">{currentUser.semester}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">
                      Capstone
                    </p>
                    <p className="font-semibold">{currentUser.capstone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Invite Members
              </h3>
              <div className="flex gap-2 w-full">
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
                  <PopoverContent className="w-full p-0">
                    <Command>
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
                <Button
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={handleInvite}
                >
                  Send Invite
                </Button>
              </div>
            </div>

            {invitedStudents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Invited Students
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {invitedStudents.map(({ email, status }) => (
                    <Card key={email} className="bg-primary/5">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10">
                              <User2 className="h-5 w-5 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{email}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusBadge(status)}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteDialog(email)}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!deleteDialog}
        onOpenChange={() => setDeleteDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this member from your group? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog && handleDelete(deleteDialog)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
