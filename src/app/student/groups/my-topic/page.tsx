"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {BookOpen, GraduationCap, Users, Award, BarChart3, FileCheck, BriefcaseBusiness, BadgeInfo,} from "lucide-react";
import DownloadDocument from "@/app/student/groups/my-topic/components/download-document";

interface Topic {
  enName: string;
  vnName: string;
  abbreviations: string;
  topicCode: string;
  capstone: string;
  profession: string;
  specialty: string;
  difficultyLevel: string;
  businessArea: string;
  description: string;
  supervisor: {
    name: string;
    email: string;
  };
  students: {
    name: string;
    email: string;
    isLeader: boolean;
  }[];
  status: string;
}

const topic: Topic = {
  enName: "Capstone Management System",
  vnName: "Hệ thống quản lý đồ án tốt nghiệp",
  abbreviations: "CMS",
  topicCode: "SP25SE148",
  capstone: "SEP490",
  profession: "Information Technology",
  specialty: "Software Engineering",
  difficultyLevel: "Hard",
  businessArea: "Education",
  description:
    "FUC is designed to solve the challenges that FPT students face by providing an intuitive and powerful platform specifically designed for students to learn all the information and requirements of the subject, and search for information about the instructor. Mentors can manage their groups in charge, assign tasks, exchange information and schedule meetings with groups In addition, FUC also provides students with a number of features to help students stay organized and on track, features such as task lists, calendars, and progress tracking will enable students to monitor their project's progress and identify potential roadblocks; scheduling to simplify the process of booking meetings with advisors and team members,students can easily propose meeting times and receive notifications about upcoming meetings.",
  supervisor: {
    name: "Le Nguyen Son Vu",
    email: "vulns@fe.edu.vn",
  },
  students: [
    {
      name: "Nguyen Duc Thang",
      email: "thangndse173512@fpt.edu.vn",
      isLeader: true,
    },
    {
      name: "Le Trung Kien",
      email: "kienltse173477@fpt.edu.vn",
      isLeader: false,
    },
    {
      name: "Mai Tan Phuc",
      email: "phucmtse171656@fpt.edu.vn",
      isLeader: false,
    },
    {
      name: "Nguyen Dinh Hoang Huy",
      email: "huyndhse173531@fpt.edu.vn",
      isLeader: false,
    },
  ],
  status: "Assigned",
};

export default function MyTopicPage() {
  return (
    <div className="container mx-auto w-full">
      <Card className="min-h-[calc(100vh-60px)]">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl text-primary">
            {topic.enName}
          </CardTitle>
          <CardDescription>{topic.vnName}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <FileCheck className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Topic Code</h3>
                <p className="font-semibold tracking-tight">
                  {topic.topicCode}
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
                  {topic.capstone}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <Award className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Abbreviation</h3>
                <p className="font-semibold tracking-tight">
                  {topic.abbreviations}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BarChart3 className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Difficulty</h3>
                <p className="font-semibold tracking-tight">
                  {topic.difficultyLevel}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <GraduationCap className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Profession</h3>
                <p className="font-semibold tracking-tight">
                  {topic.profession}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BriefcaseBusiness className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Business Area</h3>
                <p className="font-semibold tracking-tight">
                  {topic.businessArea}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <Users className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Specialty</h3>
                <p className="font-semibold tracking-tight">
                  {topic.specialty}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-muted rounded-md p-2">
                <BadgeInfo className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm text-muted-foreground">Status</h3>
                <Badge variant="outline" className="text-sm font-medium px-3 py-1">
                  {topic.status}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground">Description:</h3>
            <p className="p-4 font-semibold tracking-tight text-justify italic">
              {topic.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm text-muted-foreground">Supervisor:</h3>
            <div className="p-4 pl-0 grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <Avatar className="size-12 border-2 border-primary/10">
                  <AvatarFallback className="text-lg font-semibold text-primary">
                    {topic.supervisor.name?.slice(-1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{topic.supervisor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {topic.supervisor.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-muted-foreground">Students:</h3>
            <div className="p-4 pl-0 grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.students.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20"
                >
                  <Avatar className="size-12 border-2 border-primary/10">
                    <AvatarFallback className="text-lg font-semibold text-primary">
                      {student.name?.slice(-1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                  </div>
                  {student.isLeader ? (
                    <Badge variant="secondary" className="ml-auto">
                      Leader
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-auto">
                      Member
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <DownloadDocument 
            // topic={topic} 
            />
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>Created at:</span> <span>February 28, 2025</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-6 flex justify-between text-sm text-muted-foreground">
          <p>Register At: February 28, 2025</p>
          <p>Capstone Project Management System</p>
        </CardFooter>
      </Card>
    </div>
  );
}
