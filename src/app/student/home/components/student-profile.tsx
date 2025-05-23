"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  BookOpen,
  GraduationCap,
  Mail,
  User,
  Briefcase,
  BarChart,
  CheckCircle2,
  Users,
  X,
  CheckCircleIcon,
  BadgeInfoIcon,
  BriefcaseBusiness,
  BookText,
  School,
  BadgeIcon as IdCard,
  ALargeSmall,
  Brain,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getStudentStatus } from "@/utils/statusUtils";
import { useStudentProfile } from "@/contexts/student/student-profile-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function StudentProfile() {
  const {
    studentProfile,
    businessAreas,
    fetchBusinessArea,
    updateStudentProfile,
  } = useStudentProfile();
  const [loading, setLoading] = useState(true);
  const [businessArea, setBusinessArea] = useState("");
  const [GPA, setGPA] = useState<number>(0);
  const [skills, setSkills] = useState<string>("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);

  useEffect(() => {
    if (studentProfile) {
      setBusinessArea(studentProfile.businessArea);
      setGPA(studentProfile.gpa);
      setSkills(studentProfile.skills);
      setShowUpdateForm(
        studentProfile.businessArea === "" ||
          studentProfile.gpa === 0 ||
          studentProfile.skills === null
      );
    }
  }, [studentProfile]);

  useEffect(() => {
    const loadData = async () => {
      await fetchBusinessArea();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedBusinessArea = businessAreas.find(
      (area) => area.name === businessArea
    );
    if (selectedBusinessArea) {
      await updateStudentProfile({
        businessAreaId: selectedBusinessArea.id,
        GPA: GPA,
        skills: skills,
      });
      setShowUpdateForm(false);
      setConfirmAccuracy(false);
    }
  };

  const isFormValid = businessArea && GPA >= 5 && GPA <= 10 && confirmAccuracy;
  const canConfirm = skills && businessArea && GPA >= 5 && GPA <= 10;

  if (loading) {
    return (
      <Card className="min-h-[calc(100vh-16px)]">
        <CardContent className="pt-6">
          <Skeleton className="min-h-[calc(100vh-64px)] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-h-[calc(100vh-16px)] mt-11 sm:mt-0">
      <CardHeader className="border-b px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          {showUpdateForm ? (
            <CardTitle className="font-semibold tracking-tight text-lg sm:text-xl text-primary flex flex-wrap items-center gap-2">
              Update your personal information
              <span className="text-red-500">(Compulsory)</span>
            </CardTitle>
          ) : (
            <CardTitle className="font-semibold tracking-tight text-lg sm:text-xl text-primary">
              Student Profile
            </CardTitle>
          )}
        </div>
        <CardDescription className="text-sm">
          {showUpdateForm
            ? "Please update the necessary information for your capstone project."
            : "Your academic information for the capstone project"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 p-3 sm:p-6">
        <Card className="border shadow-sm">
          <CardHeader className="bg-primary/5 rounded-t-xl p-3 sm:p-4">
            <CardTitle className="font-semibold tracking-tight text-base sm:text-lg text-primary flex items-center gap-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-md p-1 sm:p-2">
                <IdCard className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm text-muted-foreground">
                  Student ID
                </h3>
                <p className="font-semibold tracking-tight text-sm sm:text-base break-words">
                  {studentProfile?.id}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="rounded-md p-1 sm:p-2">
                <ALargeSmall className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm text-muted-foreground">
                  Full Name
                </h3>
                <p className="font-semibold tracking-tight text-sm sm:text-base break-words">
                  {studentProfile?.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="rounded-md p-1 sm:p-2">
                <Mail className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm text-muted-foreground">
                  Email
                </h3>
                <p className="font-semibold tracking-tight text-sm sm:text-base break-words">
                  {studentProfile?.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="bg-primary/5 rounded-t-xl p-3 sm:p-4">
            <CardTitle className="font-semibold tracking-tight text-base sm:text-lg text-primary flex items-center gap-2">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-md p-1 sm:p-2">
                <School className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm text-muted-foreground">
                  Campus
                </h3>
                <p className="font-semibold tracking-tight text-sm sm:text-base break-words">
                  {studentProfile?.campusName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-md p-1 sm:p-2">
                <BookText className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm text-muted-foreground">
                  Major
                </h3>
                <p className="font-semibold tracking-tight text-sm sm:text-base break-words">
                  {studentProfile?.majorId} -{" "}
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    {studentProfile?.majorName}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-md p-1 sm:p-2">
                <BookOpen className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm text-muted-foreground">
                  Capstone
                </h3>
                <p className="font-semibold tracking-tight text-sm sm:text-base break-words">
                  {studentProfile?.capstoneId} -{" "}
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    {studentProfile?.capstoneName}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="bg-primary/5 rounded-t-xl p-3 sm:p-4">
            <CardTitle className="font-semibold tracking-tight text-base sm:text-lg text-primary flex items-center gap-2">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Capstone Project Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 space-y-4">
            {showUpdateForm && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-sm">Warning</AlertTitle>
                <AlertDescription className="text-xs sm:text-sm">
                  Please enter information accurately as it may affect your
                  group assignment and project execution.
                </AlertDescription>
              </Alert>
            )}

            <div
              className={cn(
                "grid gap-4",
                showUpdateForm
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              )}
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-md p-1 sm:p-2">
                  <BadgeInfoIcon className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm text-muted-foreground">
                    Status
                  </h3>
                  {getStudentStatus(studentProfile?.status || "")}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="rounded-md p-1 sm:p-2">
                  <Users className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm text-muted-foreground">
                    Have Group
                  </h3>
                  {studentProfile?.isHaveBeenJoinGroup ? (
                    <>
                      <p className="font-semibold tracking-tight text-sm sm:text-base flex items-center gap-2">
                        Yes
                        <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                      </p>
                    </>
                  ) : (
                    <p className="font-semibold tracking-tight text-sm sm:text-base flex items-center gap-2">
                      No
                      <X className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="rounded-md p-1 sm:p-2">
                  <BriefcaseBusiness className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm text-muted-foreground">
                    Business area
                  </h3>
                  {showUpdateForm ? (
                    <Select
                      value={businessArea}
                      onValueChange={setBusinessArea}
                    >
                      <SelectTrigger className="w-full mt-1 text-xs sm:text-sm h-8 sm:h-10">
                        <SelectValue placeholder="Select a business area" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessAreas.map((area) => (
                          <SelectItem
                            key={area.id}
                            value={area.name}
                            className="text-xs sm:text-sm"
                          >
                            {area.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="font-semibold tracking-tight text-sm sm:text-base break-words">
                      {businessArea}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="rounded-md p-1 sm:p-2">
                  <BarChart className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm text-muted-foreground">
                    GPA
                  </h3>
                  {showUpdateForm ? (
                    <Input
                      type="number"
                      value={GPA}
                      onChange={(e) => setGPA(Number(e.target.value))}
                      min={5}
                      max={10}
                      step={0.1}
                      className="w-full mt-1 text-xs sm:text-sm h-8 sm:h-10"
                    />
                  ) : (
                    <p className="font-semibold tracking-tight text-sm sm:text-base">
                      {GPA.toFixed(1)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <div className="rounded-md p-1 sm:p-2 mt-0.5">
                <Brain className="size-4 text-primary" />
              </div>
              <div className="w-full flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm text-muted-foreground">
                  Skills
                </h3>
                {showUpdateForm ? (
                  <Textarea
                    value={skills ?? ""}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Enter your skills"
                    className="w-full mt-1 text-xs sm:text-sm"
                    rows={3}
                  />
                ) : (
                  <p className="font-semibold tracking-tight text-sm sm:text-base break-words">
                    {skills}
                  </p>
                )}
              </div>
            </div>

            {showUpdateForm && (
              <div className="flex items-start space-x-2 border-t pt-3">
                <Checkbox
                  id="confirmAccuracy"
                  checked={confirmAccuracy}
                  onCheckedChange={(checked) =>
                    setConfirmAccuracy(checked as boolean)
                  }
                  disabled={!canConfirm}
                  className="mt-0.5"
                />
                <label
                  htmlFor="confirmAccuracy"
                  className={`text-xs sm:text-sm font-medium leading-tight peer-disabled:cursor-not-allowed ${
                    !canConfirm ? "text-muted-foreground" : ""
                  }`}
                >
                  I confirm that all information provided is accurate and
                  correct
                </label>
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>

      {showUpdateForm && (
        <CardFooter className="flex justify-end border-t p-3 sm:p-6">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="text-xs sm:text-sm h-9 sm:h-10"
          >
            <CheckCircle2 className="mr-1.5 h-4 w-4" />
            UPDATE INFORMATION
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
