"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, GraduationCap, Users, Award, FileCode, BarChart3, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";

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
  evaluations: {
    supervisorName: string;
    email: string;
    status: string;
    comment: string;
  }[];
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
  evaluations: [
    {
      supervisorName: "Le Huu Khanh Phuong",
      email: "phuonglhk@fe.edu.vn",
      status: "Consider",
      comment: "Độ khó và độ phức tạp cao, cần cân nhắc",
    },
    {
      supervisorName: " Nguyen Minh Sang",
      email: "sangnm18@fe.edu.vn",
      status: "Accept",
      comment: "Đề tài thú vị, trường đang thèm khát",
    },
  ],
};

const evaluationOptions = [
  { value: "Accept", color: "text-green-500" },
  { value: "Reject", color: "text-red-500" },
  { value: "Consider", color: "text-blue-500" },
];

export default function TopicAppraisalDetail() {
  const { handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      evaluation: "",
      comment: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const evaluation = watch("evaluation");

  const onSubmit = async (data: any) => {
    if (!data.evaluation) {
      alert("Please select an evaluation.");
      return;
    }
    if ((data.evaluation === "Reject" || data.evaluation === "Consider") && !data.comment) {
      alert("Please provide a comment for your evaluation.");
      return;
    }

    setIsLoading(true);
    // Call your API to submit the evaluation and comment
    // await submitEvaluation(data);
    setIsLoading(false);
    router.push("/supervisor/topics/appraisal");
  };

  return (
    <div className="container mx-auto w-full">
      <Card className="w-full shadow-lg">
        <CardHeader className="pb-4 ">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold">
                {topic.enName}
              </CardTitle>
              <CardDescription className="text-md">
                {topic.vnName}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm font-medium px-3 py-1">
              {topic.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start space-x-3">
              <div className="bg-muted rounded-md p-2 mt-0.5">
                <FileCode className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Topic Code
                </h3>
                <p className="font-semibold">{topic.topicCode}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-muted rounded-md p-2 mt-0.5">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Capstone
                </h3>
                <p className="font-semibold">{topic.capstone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-muted rounded-md p-2 mt-0.5">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Abbreviation
                </h3>
                <p className="font-semibold">{topic.abbreviations}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-muted rounded-md p-2 mt-0.5">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Difficulty
                </h3>
                <p className="font-semibold">{topic.difficultyLevel}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-muted rounded-md p-2 mt-0.5">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Profession
                </h3>
                <p className="font-semibold">{topic.profession}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-muted rounded-md p-2 mt-0.5">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Business Area
                </h3>
                <p className="font-semibold">{topic.businessArea}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-muted rounded-md p-2 mt-0.5">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Specialty
                </h3>
                <p className="font-semibold">{topic.specialty}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-md leading-relaxed text-muted-foreground">
              {topic.description}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Supervisor</h3>
              <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  <AvatarImage
                    src={`/placeholder.svg?height=48&widtarh=48`}
                    alt={topic.supervisor.name}
                  />
                  <AvatarFallback className="text-lg font-medium">
                    {topic.supervisor.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(-1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">
                    {topic.supervisor.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {topic.supervisor.email}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Students</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.students.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/10 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={student.name}
                      />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(-1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="font-semibold">{student.name}</p>
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
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Reviewer Evaluations</h3>
              {topic.evaluations.map((evaluation, index) => (
                <div key={index} className="p-4 mb-4 border rounded-lg bg-muted/20">
                  <div className="flex gap-5 items-center">
                    <p className="font-semibold">{evaluation.supervisorName}</p>
                    <Badge variant="outline" className={`text-sm font-medium px-3 py-1 ${evaluation.status === "Accept" ? "text-green-500" : evaluation.status === "Reject" ? "text-red-500" : "text-blue-500"}`}>
                      {evaluation.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{evaluation.email}</p>
                  <p className="text-md text-muted-foreground">{evaluation.comment}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Your Evaluation</h3>
              <Controller
                name="evaluation"
                control={control}
                rules={{ required: "Please select an evaluation." }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select evaluation" />
                    </SelectTrigger>
                    <SelectContent>
                      {evaluationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className={option.color}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.evaluation && (
                <p className="text-red-500 text-sm mt-1">{errors.evaluation.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="comment"
                control={control}
                rules={{
                  validate: (value) => {
                    if ((evaluation === "Reject" || evaluation === "Consider") && !value) {
                      return "Please provide a comment for your evaluation.";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <Textarea
                    placeholder="Type your comment here..."
                    className="w-full min-h-[90px]"
                    {...field}
                  />
                )}
              />
              {errors.comment && (
                <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-6 flex justify-between text-sm text-muted-foreground">
          <Button onClick={handleSubmit(onSubmit)} className="flex items-center">
            {isLoading ? <Loader2 className="animate-spin" /> : <Send className="mr-2" />}
            Send
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}