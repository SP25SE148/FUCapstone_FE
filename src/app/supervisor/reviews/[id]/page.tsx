"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BadgeInfo, BookOpen, BookText, BookUser, BriefcaseBusiness, Calendar, ChevronDown, ChevronUp, FileCheck, Loader2, PenTool, Scale, School, Send, Star, Undo2, User2, Users } from "lucide-react";

import { getDate } from "@/lib/utils";
import { getTopicDifficulty, getTopicStatus } from "@/utils/statusUtils";

import { useAuth } from "@/contexts/auth-context";
import { GroupFullInfo, Member, ReviewCriteria, ReviewResult } from "@/types/types";
import { useSupervisorReview } from "@/contexts/supervisor/supervisor-review-context";

import ResultDetails from "./components/result-details";
import ReviewCriteriaList from "./components/review-criteria";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  comment: z.string()
    .min(1, "Comment is required")
    .max(1000, "Comment must not exceed 500 characters."),

  suggestion: z.string()
    .max(1000, "Appraisal comment must not exceed 1000 characters.")
    .optional(),
});

export default function DefenseTopicDetail() {
  const { user } = useAuth();
  const { getGroupById, getReviewResultByGroupId, getReviewCriteria, updateReviewSuggestionAndComment } = useSupervisorReview();

  const router = useRouter();
  const params = useParams();
  const id: string = String(params.id);
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const attempt = searchParams.get("attempt");

  const [showMore, setShowMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showReviewResults, setShowReviewResults] = useState<boolean>(false);

  const [results, setResults] = useState<ReviewResult[]>();
  const [groupTopicInfo, setGroupTopicInfo] = useState<GroupFullInfo>();
  const [reviewCriteria, setReviewCriteria] = useState<ReviewCriteria[]>([]);
  const leaderInfo = groupTopicInfo?.groupMemberList?.find((x: Member) => x.isLeader == true)
  const memberList = groupTopicInfo?.groupMemberList?.filter((x: Member) => x.isLeader == false)
  const currentReview = results?.find((x) => x?.attempt == Number(attempt))
  const currentReviewer = currentReview?.reviewCalendarResultDetailList?.find((x) => x.author == user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      suggestion: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const data = {
        "ReviewCalenderId": id,
        "Suggestion": values?.suggestion,
        "Comment": values?.comment,
      }
      const res: any = await updateReviewSuggestionAndComment(data);
      if (res?.isSuccess) {
        form.reset();
        router.back()
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const [groupTopicDetail,
          resultDetails,
          reviewCriteriaDetail
        ] = await Promise.all([
          getGroupById(groupId || ""),
          getReviewResultByGroupId(groupId || ""),
          getReviewCriteria(attempt || ""),
        ]);

        setGroupTopicInfo(groupTopicDetail);
        setResults(resultDetails);
        setReviewCriteria(reviewCriteriaDetail)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <div className="flex items-center">
        <Button className="ml-6" size={"icon"}
          onClick={() => router.back()}
        >
          <Undo2 />
        </Button>
        <div
          className="flex-1 flex items-center justify-between cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl text-primary">{groupTopicInfo?.topicResponse?.englishName}</CardTitle>
            <CardDescription>{groupTopicInfo?.topicResponse?.vietnameseName}</CardDescription>
          </CardHeader>
          {showMore ? <ChevronUp className="mr-6" /> : <ChevronDown className="mr-6" />}
        </div>
      </div>
      <CardContent className="space-y-4">
        {/* topic info */}
        {showMore && <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BookUser className="size-4 text-primary" />
              General Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Created at: {getDate(groupTopicInfo?.topicResponse?.createdDate || "")}
            </p>
          </div>
          <Card className="bg-primary/5">
            <CardContent className="p-6 space-y-2">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm border-b pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-muted rounded-md p-2">
                    <School className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">
                      Campus
                    </h3>
                    <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.campusId}</p>
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
                    <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.semesterId}</p>
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
                    <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.capstoneId}</p>
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
                    <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.code}</p>
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
                    <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.abbreviation}</p>
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
                    <p className="font-semibold tracking-tight">{groupTopicInfo?.topicResponse?.businessAreaName}</p>
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
                    {getTopicDifficulty(groupTopicInfo?.topicResponse?.difficultyLevel || "")}
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
                    {getTopicStatus(groupTopicInfo?.topicResponse?.status || "")}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm text-muted-foreground">Description:</h3>
                <div dangerouslySetInnerHTML={{ __html: groupTopicInfo?.topicResponse?.description || "" }} />
              </div>
            </CardContent>
          </Card>
        </div>}

        {/* supervisor */}
        {showMore && <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Supervisor(s):
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary/10">
                      <User2 className="size-6 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary"> {groupTopicInfo?.topicResponse?.mainSupervisorName}</p>
                    <p className="text-sm text-muted-foreground">{groupTopicInfo?.topicResponse?.mainSupervisorEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {groupTopicInfo?.topicResponse?.coSupervisors?.map((supervisor: any, index) => (
              <Card key={index} className="bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-primary">
                        {supervisor?.supervisorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {supervisor?.supervisorEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>}

        {/* member */}
        {showMore && <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Member(s)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary/10">
                      <User2 className="size-6 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{leaderInfo?.studentFullName} - {leaderInfo?.studentId}</p>
                    <p className="text-sm text-muted-foreground">{leaderInfo?.isLeader ? "Leader" : "Member"} - {leaderInfo?.studentEmail}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {memberList?.map((member, index) => (
              <Card key={index} className="bg-primary/5">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-primary">
                      <AvatarFallback className="bg-primary/10">
                        <User2 className="size-6 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-primary">{member.studentFullName} - {member.studentId}</p>
                      <p className="text-sm text-muted-foreground">{member?.isLeader ? "Leader" : "Member"} - {member.studentEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>}

        {/* ReviewResult */}
        {results && <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2 cursor-pointer" onClick={() => { setShowReviewResults(!showReviewResults) }}>
            <BookText className="size-4 text-primary" />
            Review Results
            {showReviewResults ? <ChevronUp className="mr-6" /> : <ChevronDown className="mr-6" />}
          </h3>
          {showReviewResults && <ResultDetails results={results} />}
        </div>}

        {/* Review Criteria */}
        <ReviewCriteriaList reviewCriteria={reviewCriteria} />

        {/* My Review */}
        {!currentReviewer?.isReview &&
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Scale className="size-4 text-primary" />
              My Review:
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Type your comment here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="suggestion"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Type your suggestion here..."
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
          </div>}
      </CardContent>
    </Card>
  );
}
