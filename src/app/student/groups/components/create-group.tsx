"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { students } from "@/app/student/groups/types/student";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User2, X, Users, CirclePlus, Send, MailPlus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { useStudentProfile } from "@/contexts/student-profile-context";

interface InvitedStudent {
  email: string;
  status: "processing" | "accepted" | "rejected";
}

export function CreateGroup() {
  const [value, setValue] = useState("");
  const [invitedStudents, setInvitedStudents] = useState<InvitedStudent[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  const [isInGroup, setIsInGroup] = useState(false);
  const { studentProfile } = useStudentProfile();
  const currentUser = {
    name: "Nguyen Duc Thang",
    major: "Software Engineering",
    campus: "Ho Chi Minh",
    semester: "Spring 25",
    capstone: "SEP490",
    // groupCode: "FFFFFF",
  };

  console.log(studentProfile);

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

  if (!studentProfile?.isHaveBeenJoinGroup) {
    return (
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
            onClick={() => { setIsInGroup(true) }}
          >
            <CirclePlus />
            CREATE GROUP
          </Button>
        </div>
      </Card>
    )
  } else {
    return (
      <>
        <Card className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-primary/5 to-background">
          {/* Header */}
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle className="font-semibold tracking-tight text-xl text-primary">My group</CardTitle>
              <CardDescription>Information about my group</CardDescription>
            </CardHeader>
            <Button className="m-6 transition-all hover:scale-105">
              <Send />
              REGISTER GROUP
            </Button>
          </div>

          {/* Body */}
          <CardContent>
            <div className="space-y-8">
              {/* Group info */}
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

              {/* Invite member */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MailPlus className="size-4 text-primary" />
                  Invite Member(s)
                </h3>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    className="flex-1"
                    type="email"
                    placeholder="Enter the email of the student you want to invite"
                  />
                  <Button type="submit" variant={"outline"} className="border-primary text-primary hover:bg-primary hover:text-background">
                    <MailPlus className="size-4" />
                    Invite
                  </Button>
                </div>
              </div>

              {/* List invited */}
              {invitedStudents.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Users className="size-4 text-primary" />
                    Invited Student(s)
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {invitedStudents.map(({ email, status }) => (
                      <Card key={email} className="bg-primary/5">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-12 border-2 border-primary">
                              <AvatarFallback className="bg-primary/10">
                                <User2 className="size-6 text-primary" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">Lê Nguyễn Sơn Vũ - VuLNS</p>
                              <p className="text-sm text-muted-foreground">vulns@fe.edu.vn</p>
                            </div>
                          </div>
                          <span className="font-semibold text-sm text-muted-foreground">Member</span>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(status)}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteDialog(email)}
                              className="text-destructive hover:text-destructive/90"
                            >
                              <X />
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
      </>
    );
  }
}
