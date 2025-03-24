"use client";

import { AlertCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

import { useStudentProfile } from "@/contexts/student/student-profile-context";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkeletonLoader } from "@/components/layout/skeleton-loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StudentUpdateForm() {
  const { studentProfile, businessAreas, fetchBusinessArea, updateStudentProfile } = useStudentProfile();
  const [email, setEmail] = useState("");
  const [GPA, setGPA] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [campusName, setCampusName] = useState("");
  const [businessArea, setBusinessArea] = useState("");

  useEffect(() => {
    if (studentProfile) {
      setFullName(studentProfile.fullName);
      setCampusName(studentProfile.campusName);
      setEmail(studentProfile.email);
      setBusinessArea(studentProfile.businessArea);
      setGPA(studentProfile.gpa);
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
    const selectedBusinessArea = businessAreas.find(area => area.name === businessArea);
    if (selectedBusinessArea) {
      await updateStudentProfile({ businessAreaId: selectedBusinessArea.id, GPA: GPA });
    }
  };

  const isFormValid = businessArea && GPA >= 5 && GPA <= 10;

  return (
    <Card className="min-h-[calc(100vh-16px)] max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary text-center">Update Student Information</CardTitle>
        <CardDescription className="text-center">
          Please provide accurate information for your capstone project
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please enter information accurately as it may affect your group assignment and project execution.
              </AlertDescription>
            </Alert>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="fullName">Student Name</Label>
                <Input id="fullName" value={fullName} disabled className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Student ID</Label>
                <Input id="id" value={studentProfile?.id || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campusName">Campus Name</Label>
                <Input id="campusName" value={campusName} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capstoneId">Capstone ID</Label>
                <Input id="capstoneId" value={studentProfile?.capstoneId || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} disabled />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="businessArea">
                  Business Area <span className="text-red-500">*</span>
                </Label>
                <Select value={businessArea} onValueChange={setBusinessArea}>
                  <SelectTrigger>
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
              <div className="col-span-2 space-y-2">
                <Label htmlFor="GPA">
                  GPA <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="GPA"
                  type="number"
                  value={GPA}
                  onChange={(e) => setGPA(Number(e.target.value))}
                  min={5}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="col-span-2" disabled={!isFormValid}>
                Update Information
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card >
  );
}