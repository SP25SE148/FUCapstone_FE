"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const businessAreas = ["Finance", "IT", "Healthcare", "Education", "Marketing"];
const technicalAreas = ["NodeJS", ".Net", "Java", "Python", "React"];

export default function StudentUpdateForm() {
  const [overall, setOverall] = useState("");
  const [businessArea, setBusinessArea] = useState("");
  const [technicalArea, setTechnicalArea] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ overall, businessArea, technicalArea });
    localStorage.setItem("studentInfoUpdated", "true");
    router.push("/student/home");
  };

  const isFormValid = overall && businessArea && technicalArea;

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Student ID</Label>
                <Input id="id" value="SE171656" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campusId">Campus ID</Label>
                <Input id="campusId" value="HCM" readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capstoneId">Capstone ID</Label>
              <Input id="capstoneId" value="SEP490" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overall">Overall Score</Label>
              <Input
                id="overall"
                value={overall}
                onChange={(e) => setOverall(e.target.value)}
                maxLength={10}
                placeholder="Enter your overall score"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessArea">Business Area</Label>
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
              <Label htmlFor="technicalArea">Technical Area</Label>
              <Select value={technicalArea} onValueChange={setTechnicalArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a technical area" />
                </SelectTrigger>
                <SelectContent>
                  {technicalAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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