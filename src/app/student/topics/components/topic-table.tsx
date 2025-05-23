"use client";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileX,
  Filter,
  Search,
  Trash2,
  User,
} from "lucide-react";

import { useStudentTopics } from "@/contexts/student/student-topic-context";
import { useStudentProfile } from "@/contexts/student/student-profile-context";

import NotAllow from "./not-allow";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { PassedTopicProp, Topic } from "@/types/types";
import ItemTopic from "@/app/student/topics/components/item-topic";

const formSchema = z.object({
  searchTerm: z
    .string()
    .max(50, "Search term must not exceed 50 characters.")
    .optional(),
  businessAreaId: z.string().optional(),
  difficultyLevel: z.string().optional(),
  mainSupervisorEmail: z
    .string()
    .email("Invalid supervisor email.")
    .optional()
    .or(z.literal("")),
});

export default function TopicTable() {
  const { studentProfile } = useStudentProfile();
  const {
    passedTopicList,
    groupInfo,
    businessAreaList,
    fetchPassedTopic,
  } = useStudentTopics();

  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(
    passedTopicList?.currentPage || 1
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: "",
      businessAreaId: "",
      difficultyLevel: "",
      mainSupervisorEmail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setPageNumber(1);
    const data: PassedTopicProp = {
      searchTerm: values?.searchTerm || "",
      businessAreaId: values?.businessAreaId || "all",
      difficultyLevel: values?.difficultyLevel || "all",
      mainSupervisorEmail: values?.mainSupervisorEmail || "all",
      pageNumber: "1",
    };
    setIsLoading(true);
    try {
      const res: any = await fetchPassedTopic(data);
      if (res?.isSuccess) {
        setOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleReset = () => {
    form.reset();
    const data: PassedTopicProp = {
      searchTerm: "",
      businessAreaId: "all",
      difficultyLevel: "all",
      mainSupervisorEmail: "all",
      pageNumber: "1",
    };
    fetchPassedTopic(data);
    setOpen(false);
  };

  // pagination handle
  const handleNextPage = () => {
    if (pageNumber < passedTopicList?.totalNumberOfPages) {
      setPageNumber((prev: number) => prev + 1);
    }
  };
  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev: number) => prev - 1);
    }
  };

  useEffect(() => {
    const values = form.getValues();
    const data: PassedTopicProp = {
      searchTerm: values?.searchTerm || "",
      businessAreaId: values?.businessAreaId || "all",
      difficultyLevel: values?.difficultyLevel || "all",
      mainSupervisorEmail: values?.mainSupervisorEmail || "all",
      pageNumber: String(pageNumber),
    };
    fetchPassedTopic(data);
  }, [pageNumber]);

  return !studentProfile?.isHaveBeenJoinGroup ||
    groupInfo?.status !== "InProgress" ? (
    <NotAllow />
  ) : (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Topics
        </CardTitle>
        <CardDescription>
          List of Graduation Project Topics that students can register for
        </CardDescription>
      </CardHeader>

      <div className="px-6 pt-6 pb-2 flex items-center justify-between">
        <Button
          onClick={() => setOpen(!open)}
          variant={open ? "default" : "outline"}
          className="gap-2 transition-all"
        >
          <Filter className="h-4 w-4" />
          {open ? "Hide Filters" : "Filters"}
        </Button>

        <div className="text-sm text-muted-foreground">
          {passedTopicList?.totalNumberOfItems > 0 && (
            <span>
              Showing {passedTopicList?.items?.length} of{" "}
              {passedTopicList?.totalNumberOfItems} topics
            </span>
          )}
        </div>
      </div>

      <CardContent className="space-y-6">
        {open && (
          <Card className="p-6 border border-primary/20">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-primary flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Topics
              </CardTitle>
              <CardDescription>
                Filter topics by different criteria
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="searchTerm"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="What are you looking for?"
                            {...field}
                            disabled={isLoading}
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="businessAreaId"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Business Area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessAreaList?.map(
                              (businessArea: any, index: number) => (
                                <SelectItem
                                  key={index}
                                  value={businessArea?.id}
                                >
                                  <strong>{businessArea?.name}</strong>
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="difficultyLevel"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Difficulty Level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"0"}>
                              <strong>Easy</strong>
                            </SelectItem>
                            <SelectItem value={"1"}>
                              <strong>Medium</strong>
                            </SelectItem>
                            <SelectItem value={"2"}>
                              <strong>Hard</strong>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mainSupervisorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Supervisor email"
                              {...field}
                              disabled={isLoading}
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <Button
                    type="reset"
                    onClick={handleReset}
                    variant={"outline"}
                    className="gap-2"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>
                  <Button type="submit" className="gap-2" disabled={isLoading}>
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        )}


        {passedTopicList?.items?.length <= 0 && (
          <Card className="p-8 flex items-center justify-center bg-muted/50 border-dashed border-2">
            <div className="flex flex-col items-center justify-center gap-6 py-8">
              <div className="bg-primary/10 p-4 rounded-full">
                <FileX className="size-16 text-primary" />
              </div>
              <div className="space-y-2 text-center max-w-md">
                <p className="text-2xl font-bold">No topics found</p>
                <p className="text-muted-foreground">
                  We couldn't find any topics that match your request. Please
                  try again with other criteria.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* list topic */}
        <div className="space-y-3">
          {passedTopicList?.items?.map((topic: Topic, index: number) => (
            <ItemTopic key={index} topic={topic} />
          ))}
        </div>

        {/* pagination */}
        {passedTopicList?.items?.length > 0 && (
          <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4 border-t">
            <Button
              size={"sm"}
              variant="outline"
              onClick={
                pageNumber > 1 ? handlePreviousPage : (e) => e.preventDefault()
              }
              disabled={pageNumber === 1}
              className={`flex items-center gap-1 ${pageNumber === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <ChevronLeft className="h-3 sm:h-4 w-3 sm:w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-xs sm:text-base">
              <span className="px-2 sm:px-3 py-1 bg-primary/10 rounded-md font-medium">
                {passedTopicList?.currentPage}
              </span>
              <span className="text-muted-foreground">
                of {passedTopicList?.totalNumberOfPages}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground px-1 sm:px-2 py-1 bg-muted rounded-md">
              Total: {passedTopicList?.totalNumberOfItems}
            </div>

            <Button
              size={"sm"}
              variant="outline"
              onClick={
                pageNumber < passedTopicList?.totalNumberOfPages
                  ? handleNextPage
                  : (e) => e.preventDefault()
              }
              disabled={pageNumber === passedTopicList?.totalNumberOfPages}
              className={`flex items-center gap-1 ${pageNumber === passedTopicList?.totalNumberOfPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                }`}
            >
              Next
              <ChevronRight className="h-3 sm:h-4 w-3 sm:w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
