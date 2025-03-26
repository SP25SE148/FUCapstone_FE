"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Loader2, Send, School, Calendar, FileCheck, PenTool, BriefcaseBusiness, Star, BadgeInfo, FileX, Undo2, BookUser, Users, User2, Scale } from "lucide-react";

import { getDate } from "@/lib/utils";
import { Topic, useSupervisorTopicAppraisal } from "@/contexts/supervisor/supervisor-topic-appraisal-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import DownloadDocument from "@/app/supervisor/topics/appraisal/[id]/components/download-document";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  appraisalContent: z.string()
    // .min(10, "Appraisal content must be at least 10 characters long.")
    .max(500, "Appraisal content must not exceed 500 characters.")
    .optional(),

  appraisalComment: z.string()
    // .min(5, "Appraisal comment must be at least 5 characters long.")
    .max(200, "Appraisal comment must not exceed 200 characters.")
    .optional(),

  status: z.enum(["1", "2", "3"], {
    errorMap: () => ({ message: "Please select evaluation" }),
  }),
});

const getDifficultyStatus = (status: string | undefined) => {
  switch (status) {
    case "Easy":
      return <Badge variant="secondary" className="select-none bg-blue-400 text-blue-800 hover:bg-blue-400">{status}</Badge>
    case "Medium":
      return <Badge variant="secondary" className="select-none bg-green-400 text-green-800 hover:bg-green-400">{status}</Badge>
    case "Hard":
      return <Badge variant="secondary" className="select-none bg-red-400 text-red-800 hover:bg-red-400">{status}</Badge>
    default:
      return null;
  }
}

const getStatus = (status: string | undefined) => {
  switch (status) {
    case "Pending":
      return (
        <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
          {status}
        </Badge>
      );
    case "Approved":
      return (
        <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
          {status}
        </Badge>
      );
    case "Considered":
      return (
        <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
          {status}
        </Badge>
      );
    case "Rejected":
      return (
        <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
          {status}
        </Badge>
      );
    default:
      return null;
  }
}

export default function TopicAppraisalDetail() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const topicId: string = String(params.id);
  const topicAppraisalId = searchParams.get('topicAppraisalId');

  const [topic, setTopic] = useState<Topic>();
  const [isLoading, setIsLoading] = useState(false);
  const { getTopicAppraisalBySelf, submitAppraisalForSupervisor, fetchTopicsById } = useSupervisorTopicAppraisal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appraisalComment: "",
      appraisalContent: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const data = {
        "topicAppraisalId": topicAppraisalId,
        "topicId": topicId,
        "appraisalContent": values?.appraisalContent,
        "appraisalComment": values?.appraisalComment,
        "status": Number(values?.status),
      }
      const res: any = await submitAppraisalForSupervisor(data);
      if (res?.isSuccess) {
        getTopicAppraisalBySelf();
        form.reset();
        router.back()
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const topicDetail = await fetchTopicsById(topicId);
      setTopic(topicDetail)
    })();
  }, [topicId, topicAppraisalId])

  return topic
    ?
    <Card className="min-h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button className="ml-6" size={"icon"}
            onClick={() => router.back()}
          >
            <Undo2 />
          </Button>
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl text-primary">{topic?.englishName}</CardTitle>
            <CardDescription>{topic?.vietnameseName}</CardDescription>
          </CardHeader>
        </div>
        <DownloadDocument topic={topic} />
      </div>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BookUser className="size-4 text-primary" />
              General Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Created at: {getDate(topic?.createdDate)}
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
                    <h3 className="text-sm text-muted-foreground">
                      Campus
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.campusId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <Calendar className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Semester
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.semesterId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BookOpen className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Capstone
                    </h3>
                    <p className="font-semibold tracking-tight">{topic?.capstoneId}</p>
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
                    <p className="font-semibold tracking-tight">{topic?.code}</p>
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
                    <p className="font-semibold tracking-tight">{topic?.abbreviation}</p>
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
                    <p className="font-semibold tracking-tight">{topic?.businessAreaName}</p>
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
                    {getDifficultyStatus(topic?.difficultyLevel)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <BadgeInfo className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Status
                    </h3>
                    {getStatus(topic?.status)}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm text-muted-foreground">Description:</h3>
                <p className="font-semibold tracking-tight text-justify italic">{topic?.description}</p>
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
                    <p className="font-semibold"> {topic?.mainSupervisorName}</p>
                    <p className="text-sm text-muted-foreground">{topic?.mainSupervisorEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {topic?.coSupervisors?.map((supervisor: any, index) => (
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
                        {supervisor?.SupervisorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {supervisor?.SupervisorEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Scale className="size-4 text-primary" />
            Evaluation:
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select evaluation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"1"}><strong className="text-green-600">Accepted</strong></SelectItem>
                        <SelectItem value={"2"}><strong className="text-blue-600">Considered</strong></SelectItem>
                        <SelectItem value={"3"}><strong className="text-red-600">Rejected</strong></SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appraisalContent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your appraisal content here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appraisalComment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your appraisal comment here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end">
                <Button type="submit">
                  {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                  Send
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
    :
    <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
      <div className="flex flex-col items-center justify-center gap-8">
        <FileX className="size-20 text-primary" />
        <div className="space-y-2">
          <p className="text-2xl font-bold text-center">
            You are trying to access a topic that does not exist.
          </p>
          <p className="text-muted-foreground text-center">
            Please check the Id again or view another topic.
          </p>
        </div>
      </div>
    </Card>
}