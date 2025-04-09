"use client";

import { AlertCircle, BookOpen, Building, GraduationCap, Mail, User, Briefcase, BarChart, CheckCircle2, Users, Check, X } from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import { useStudentProfile } from "@/contexts/student/student-profile-context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { getStudentStatus } from "@/utils/statusUtils";

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
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);

  useEffect(() => {
    if (studentProfile) {
      setBusinessArea(studentProfile.businessArea);
      setGPA(studentProfile.gpa);
      setShowUpdateForm(
        studentProfile.businessArea === "" || studentProfile.gpa === 0
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
      });
      setShowUpdateForm(false);
      setConfirmAccuracy(false);
    }
  };

  const isFormValid = businessArea && GPA >= 5 && GPA <= 10 && confirmAccuracy;
  const canConfirm = businessArea && GPA >= 5 && GPA <= 10

  if (loading) {
    return (
      <Card className="min-h-[calc(100vh-16px)] max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <SkeletonLoader />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-h-[calc(100vh-16px)] w-full max-w-full mx-auto shadow-lg">
       <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold tracking-tight text-2xl text-primary">
            {showUpdateForm ? (
              <span className="flex items-center">
                Update your personal information <span className="text-red-500 ml-2">(Compulsory)</span>
              </span>
            ) : (
              "Student Profile"
            )}
          </CardTitle>
          <div className="flex items-center gap-3">
          {getStudentStatus(studentProfile?.status || "")}
            <div className="flex items-center gap-2">
              <Badge
                variant={studentProfile?.isHaveBeenJoinGroup ? "outline" : "secondary"}
                className="flex items-center gap-1"
              >
                <Users className="h-4 w-4" />
                Have Group:
                {studentProfile?.isHaveBeenJoinGroup ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </Badge>
            </div>
          </div>
          
        </div>
        <CardDescription>
          {showUpdateForm
            ? "Please update the necessary information for your capstone project."
            : "Your academic information for the capstone project"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 py-6">
        <Card className="border shadow-sm">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-medium text-primary">
                Personal Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm text-muted-foreground">
                Student ID
              </Label>
              <p className="font-medium mt-1">{studentProfile?.id}</p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Full Name</Label>
              <p className="font-medium mt-1">{studentProfile?.fullName}</p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Email</Label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{studentProfile?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-medium text-primary">
                Academic Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm text-muted-foreground">Major</Label>
              <div className="flex items-center gap-2 mt-1">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">
                  {studentProfile?.majorName} ({studentProfile?.majorId})
                </p>
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Capstone</Label>
              <p className="font-medium mt-1">
                {studentProfile?.capstoneName} ({studentProfile?.capstoneId})
              </p>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Campus</Label>
              <div className="flex items-center gap-2 mt-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{studentProfile?.campusName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-medium text-primary">
                Capstone Project Information
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label className="text-sm text-muted-foreground">
                  Business Area
                </Label>
                {showUpdateForm ? (
                  <div className="mt-1">
                    <Select
                      value={businessArea}
                      onValueChange={setBusinessArea}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a business area" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessAreas.map((area) => (
                          <SelectItem key={area.id} value={area.name}>
                            {area.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{businessArea}</p>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">GPA</Label>
                {showUpdateForm ? (
                  <div className="mt-1">
                    <Input
                      type="number"
                      value={GPA}
                      onChange={(e) => setGPA(Number(e.target.value))}
                      min={5}
                      max={10}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{GPA.toFixed(1)}</p>
                  </div>
                )}
              </div>
            </div>

            {showUpdateForm && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Please enter information accurately as it may affect your
                  group assignment and project execution.
                </AlertDescription>
              </Alert>
            )}

            {showUpdateForm && (
              <div className="flex items-center space-x-2 mt-4 border-t pt-3">
                <Checkbox
                  id="confirmAccuracy"
                  checked={confirmAccuracy}
                  onCheckedChange={(checked) => setConfirmAccuracy(checked as boolean)}
                  disabled={!canConfirm}
                />
                <label
                  htmlFor="confirmAccuracy"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${
                    !canConfirm ? "text-muted-foreground" : ""
                  }`}
                >
                  I confirm that all information provided is accurate and correct
                </label>
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>

      {showUpdateForm && (
        <CardFooter className="flex justify-end pt-0 border-t p-6">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="px-6"
            size="lg"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Update Information
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
