"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  FileCheck,
  BriefcaseBusiness,
  BadgeInfo,
  School,
  Calendar,
  PenTool,
  Star,
  User2,
  Upload,
  ArrowRight,
} from "lucide-react";
import { defenseData } from "@/app/manager/defenses/data";
import { useParams } from "next/navigation";
import DownloadDocument from "@/app/supervisor/defenses/[id]/components/download-document";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function DefenseTopicDetail() {
  const { id } = useParams();
  const defense = defenseData.find((d) => d.id === id);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openContinueDialog, setOpenContinueDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState("2nd Defense");
  if (!defense) {
    return <p className="text-center text-red-500">Defense not found.</p>;
  }

  const { topic } = defense;

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl text-primary">
              {topic.englishName}
            </CardTitle>
            <CardDescription>{topic.vietnameseName}</CardDescription>
          </CardHeader>
        </div>
        <div className="mr-6">
          <DownloadDocument topic={[]} />
        </div>
      </div>

      <CardContent className="space-y-4">
        {/* General Information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              General Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Created at: {new Date(topic.createdDate).toLocaleDateString()}
            </p>
          </div>
          <Card className="bg-primary/5">
            <CardContent className="p-6 space-y-2">
              <div className="grid grid-cols-4 gap-6 text-sm border-b pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <School className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Campus</h3>
                    <p className="font-semibold tracking-tight">
                      {topic.campusId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <Calendar className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Semester</h3>
                    <p className="font-semibold tracking-tight">
                      {topic.semesterId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BookOpen className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Capstone</h3>
                    <p className="font-semibold tracking-tight">
                      {topic.capstoneId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <FileCheck className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Topic code
                    </h3>
                    <p className="font-semibold tracking-tight">{topic.code}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <PenTool className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Abbreviation
                    </h3>
                    <p className="font-semibold tracking-tight">
                      {topic.abbreviation}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BriefcaseBusiness className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Business area
                    </h3>
                    <p className="font-semibold tracking-tight">
                      {topic.businessAreaName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <Star className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Difficulty
                    </h3>
                    <p className="font-semibold tracking-tight">
                      {topic.difficultyLevel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BadgeInfo className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Status</h3>
                    <p className="font-semibold tracking-tight">
                      {topic.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm text-muted-foreground">Description:</h3>
                <p className="font-semibold tracking-tight text-justify italic">
                  {topic.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Supervisor(s):
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary/10">
                      <User2 className="size-6 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{topic.mainSupervisorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {topic.mainSupervisorEmail}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {topic.coSupervisors?.map((supervisor, index) => (
              <Card key={index} className="bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {supervisor.SupervisorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {supervisor.SupervisorEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => setOpenUploadDialog(true)}
          className="flex items-center gap-2"
        >
          <Upload className="mr-2" />
          Upload Minutes
        </Button>
        <Button
          onClick={() => setOpenContinueDialog(true)}
          className="flex items-center gap-2"
        >
          <ArrowRight className="mr-2" />
          Continue
        </Button>
      </CardFooter>

      {/* Upload Minutes Dialog */}
      <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Minutes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input type="file" accept=".pdf" />
            <Button className="w-full">
              <Upload className="mr-2" />
              Upload
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openContinueDialog} onOpenChange={setOpenContinueDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Continue Defense</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={selectedOption === "2nd Defense" ? "default" : "outline"}
                className={`h-12 ${selectedOption === "2nd Defense" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                onClick={() => setSelectedOption("2nd Defense")}
              >
                2nd Defense
              </Button>
              <Button
                variant={selectedOption === "Finish" ? "default" : "outline"}
                className={`h-12 ${selectedOption === "Finish" ? "bg-primary text-primary-foreground" : "bg-background"}`}
                onClick={() => setSelectedOption("Finish")}
              >
                Finish
              </Button>
            </div>
            <Button className="w-full">
              <ArrowRight className="mr-2" />
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
