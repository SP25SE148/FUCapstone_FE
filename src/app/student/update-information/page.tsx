"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useStudentProfile } from "@/contexts/student-profile-context";

const businessAreas = ["Finance", "IT", "Healthcare", "Education", "Marketing"];
const technicalAreas = ["NodeJS", ".Net", "Java", "Python", "React"];

export default function StudentUpdateForm() {
  const { studentProfile, updateStudentProfile } = useStudentProfile();
  const [overall, setOverall] = useState("");
  const [businessArea, setBusinessArea] = useState("");
  const [technicalArea, setTechnicalArea] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [campusName, setCampusName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (studentProfile) {
      setFullName(studentProfile.fullName);
      setCampusName(studentProfile.campusName);
      setEmail(studentProfile.email);
      setBusinessArea(studentProfile.businessArea);
      setTechnicalArea(studentProfile.studentExpertises);
    }
  }, [studentProfile]);

  const handleTechnicalAreaChange = (area: string) => {
    setTechnicalArea((prev) =>
      prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({ businessArea, studentExpertises: technicalArea });
    router.push("/student/home");
  };

  const isFormValid = businessArea && technicalArea.length > 0;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Update Student Information</CardTitle>
          <CardDescription className="text-center">
            Please provide accurate information for your capstone project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Please enter information accurately as it may affect your group assignment and project execution.
            </AlertDescription>
          </Alert>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Student Name</Label>
              <Input id="fullName" value={fullName} readOnly className="w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Student ID</Label>
                <Input id="id" value={studentProfile?.id || ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campusName">Campus Name</Label>
                <Input id="campusName" value={campusName} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capstoneId">Capstone ID</Label>
                <Input id="capstoneId" value={studentProfile?.capstoneId || ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} readOnly />
              </div>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="overall">Overall Score</Label>
              <Input
                id="overall"
                value={overall}
                onChange={(e) => setOverall(e.target.value)}
                maxLength={10}
                placeholder="Enter your overall score"
              />
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="businessArea">
                Business Area <span className="text-red-500">*</span>
              </Label>
              <Select value={businessArea} onValueChange={setBusinessArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a business area" />
                </SelectTrigger>
                <SelectContent>
                  {businessAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="technicalArea">
                Technical Area <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {technicalAreas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={technicalArea.includes(area)}
                      onCheckedChange={() => handleTechnicalAreaChange(area)}
                    />
                    <Label htmlFor={area}>{area}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={!isFormValid}>
              Update Information
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}