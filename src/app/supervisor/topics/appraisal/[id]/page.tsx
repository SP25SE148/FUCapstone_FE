"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Loader2, Send, School, Calendar, FileCheck, PenTool, BriefcaseBusiness, Star, BadgeInfo, FileX } from "lucide-react";

import { Topic, useSupervisorTopicAppraisal } from "@/contexts/supervisor/supervisor-topic-appraisal-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DownloadDocument from "@/app/supervisor/topics/appraisal/[id]/components/download-document";

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

const getDifficultyStatus = (status: number | undefined) => {
  switch (status) {
    case 0:
      return <Badge variant="secondary" className="select-none bg-blue-400 text-blue-800 hover:bg-blue-400">Easy</Badge>
    case 1:
      return <Badge variant="secondary" className="select-none bg-green-400 text-green-800 hover:bg-green-400">Medium</Badge>
    case 2:
      return <Badge variant="secondary" className="select-none bg-red-400 text-red-800 hover:bg-red-400">Hard</Badge>
    default:
      return null;
  }
}

const getStatus = (status: number | undefined) => {
  switch (status) {
    case 0:
      return (
        <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
          Pending
        </Badge>
      );
    case 1:
      return (
        <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
          Passed
        </Badge>
      );
    case 2:
      return (
        <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
          Considered
        </Badge>
      );
    case 3:
      return (
        <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
          Failed
        </Badge>
      );
    default:
      return null;
  }
}

const getCreatedDate = (data: string | undefined) => {
  const date = new Date(data || "");
  // Chuyển sang giờ Việt Nam (GMT+7)
  const vnDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

  const day = vnDate.getDate().toString().padStart(2, '0');
  const month = (vnDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = vnDate.getFullYear();

  const hours = vnDate.getHours().toString().padStart(2, '0');
  const minutes = vnDate.getMinutes().toString().padStart(2, '0');
  const seconds = vnDate.getSeconds().toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <span>{`${day}/${month}/${year}`}</span>
      <span className="text-muted-foreground">{`${hours}:${minutes}:${seconds}`}</span>
    </div>
  )
};

export default function TopicAppraisalDetail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();
  const topicId: string = String(params.id);
  const topicAppraisalId = searchParams.get('topicAppraisalId');
  const [topic, setTopic] = useState<Topic>();
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
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">{topic?.englishName}</CardTitle>
        <CardDescription>{topic?.vietnameseName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
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
        <div>
          <h3 className="text-sm text-muted-foreground">Description:</h3>
          <p className="p-4 font-semibold tracking-tight text-justify italic">{topic?.description}</p>
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">Supervisor(s):</h3>
          <div className="p-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
              <Avatar className="size-12 border-2 border-primary/10">
                <AvatarFallback className="text-lg font-semibold text-primary">
                  {topic?.mainSupervisorName?.slice(-1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">
                  {topic?.mainSupervisorName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {topic?.mainSupervisorEmail}
                </p>
              </div>
            </div>
            {topic?.coSupervisors?.map((supervisor: any, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-muted/20">
                <Avatar className="size-12 border-2 border-primary/10">
                  <AvatarFallback className="text-lg font-semibold text-primary">
                    {supervisor?.SupervisorName.slice(-1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">
                    {supervisor?.SupervisorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {supervisor?.SupervisorEmail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <DownloadDocument topic={topic} />
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>Created at:</span> {getCreatedDate(topic?.createdDate)}
          </div>
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">Evaluation:</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
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