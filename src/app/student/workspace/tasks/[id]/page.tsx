"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useStudentTasks } from "@/contexts/student/student-task-context";
import { Textarea } from "@/components/ui/textarea";
import {
  ClipboardList,
  AlignLeft,
  Clock,
  CheckCircle2,
  CircleDashed,
  CircleDot,
  History,
  MessageSquare,
  Plus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDate } from "@/lib/utils";
import UpdateStatus from "@/app/student/workspace/tasks/components/update-status";
import AssignTask from "@/app/student/workspace/tasks/components/assign-task";
import UpdatePriority from "@/app/student/workspace/tasks/components/update-priority";
import UpdateDueDate from "@/app/student/workspace/tasks/components/update-duedate";
import { Task } from "@/types/types";

const getStatusBadge = (status: number) => {
  switch (status) {
    case 0:
      return {
        label: "Done",
        color: "bg-green-500",
        icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
      };
    case 1:
      return {
        label: "In Progress",
        color: "bg-blue-500",
        icon: <CircleDot className="h-4 w-4 mr-1" />,
      };
    case 2:
      return {
        label: "To Do",
        color: "bg-gray-500",
        icon: <CircleDashed className="h-4 w-4 mr-1" />,
      };
  }
};
export default function TaskDetailPage() {
  const { id } = useParams();
  const { getTaskDetail, updateTask } = useStudentTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [originalTask, setOriginalTask] = useState<Task | null>(null); // Store original values
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          const taskResponse = await getTaskDetail(String(id));
          if (taskResponse) {
            setTask(taskResponse);
            setOriginalTask(taskResponse);
            setSummary(taskResponse.summary || "");
            setDescription(taskResponse.description || "");
          }
        } catch (error) {
          console.error("Error fetching task:", error);
        } finally {
        }
      }
    };
    fetchTask();
  }, [id, getTaskDetail]);

  const handleSave = async (field: "summary" | "description") => {
    if (!task) return;

    const updatedTask = {
      ...task,
      [field]: field === "summary" ? summary : description,
    };

    await updateTask(updatedTask);
    if (field === "summary") {
      setIsEditingSummary(false);
    }
    if (field === "description") {
      setIsEditingDescription(false);
    }
  };

  const handleDiscard = (field: "summary" | "description") => {
    if (field === "summary") {
      setSummary(originalTask?.summary || "");
      setIsEditingSummary(false);
    }
    if (field === "description") {
      setDescription(originalTask?.description || "");
      setIsEditingDescription(false);
    }
  };

  const handleAddComment = async () => {
    const updatedTask = {
      ...task,
      comment: newComment,
    };
    await updateTask(updatedTask);
    // setTask(updatedTask);
    setShowCommentInput(false);
    setNewComment("");
  };

  if (!task) {
    return (
      <p className="text-center text-muted-foreground">
        Loading task details...
      </p>
    );
  }

  const statusBadge = getStatusBadge(task.status);

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{task.keyTask}</h1>
            <Badge
              variant="outline"
              className={`${statusBadge?.color} text-white flex items-center px-2 py-1`}
            >
              {statusBadge?.icon}
              {statusBadge?.label}
            </Badge>
          </div>
          <div className="flex justify-start items-center">
            <span className="text-md text-muted-foreground w-24">Task ID</span>
            <span className="text-md text-muted-foreground">{task.id}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            {(() => {
              const dueDate = new Date(task.dueDate);
              const today = new Date();
              const diffTime = dueDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays > 0) {
                return `Due in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
              } else if (diffDays === 0) {
                return "Due today";
              } else {
                return `Overdue by ${Math.abs(diffDays)} day${
                  Math.abs(diffDays) > 1 ? "s" : ""
                }`;
              }
            })()}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-3">
        <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-160px)] pr-2">
          <Card className="border rounded-lg shadow-sm">
            <CardHeader className="flex-row justify-between items-center">
              <CardTitle className="text-sm flex items-center">
                <ClipboardList className="h-5 w-5 mr-2 text-primary" />
                Summary
              </CardTitle>
              <div>
                {isEditingSummary && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDiscard("summary")}
                    >
                      Discard
                    </Button>
                    <Button size="sm" onClick={() => handleSave("summary")}>
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                  setIsEditingSummary(true);
                }}
                className="min-h-[60px] resize-none focus-visible:ring-1"
                placeholder="No summary provided."
              />
            </CardContent>
          </Card>

          <Card className="border rounded-lg shadow-sm">
            <CardHeader className="flex-row justify-between items-center">
              <CardTitle className="text-sm flex items-center">
                <AlignLeft className="h-5 w-5 mr-2 text-primary" />
                Description
              </CardTitle>
              {isEditingDescription && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDiscard("description")}
                  >
                    Discard
                  </Button>
                  <Button size="sm" onClick={() => handleSave("description")}>
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsEditingDescription(true);
                }}
                className="min-h-[80px] resize-none focus-visible:ring-1"
                placeholder="No description provided."
              />
            </CardContent>
          </Card>

          <Card className="border rounded-lg shadow-sm py-4">
            <CardContent className="mt-5">
              <Tabs defaultValue="comments">
                <TabsList className="mb-1 w-full flex justify-start mx-auto">
                  <TabsTrigger
                    value="comments"
                    className="flex items-center gap-1 text-xs"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Comments
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="flex items-center gap-1 text-xs"
                  >
                    <History className="h-5 w-5" />
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="comments" className="space-y-4">
                  {!showCommentInput && (
                    <Button
                      variant="outline"
                      className="w-full justify-start text-muted-foreground"
                      onClick={() => setShowCommentInput(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add a comment...
                    </Button>
                  )}

                  {showCommentInput && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        className="min-h-[60px] bg-white"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowCommentInput(false)}
                        >
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleAddComment}>
                          Add
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  {task.fucTaskHistories && task.fucTaskHistories.length > 0 ? (
                    <div className="border rounded-lg divide-y">
                      {task.fucTaskHistories
                        .slice()
                        .reverse()
                        .map((history: any) => (
                          <div key={history.id} className="p-4">
                            <div className="flex items-start gap-3">
                              <History className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  {getDate(history.createdDate)}
                                </p>
                                <p className="font-medium">{history.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-lg bg-muted/20">
                      <Clock className="h-10 w-10 mx-auto text-muted-foreground mb-2 opacity-50" />
                      <p className="text-muted-foreground">
                        No history available
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Changes to this task will be recorded here
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <Card className="border rounded-lg shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-lg">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground w-24">Status</span>
              <div className="flex-1">
                <UpdateStatus task={task} onClose={() => {}} />
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground w-24">
                Assignee
              </span>
              <div className="flex-1">
                <AssignTask task={task} onAssign={() => {}} />
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground w-24">
                Reporter
              </span>
              <div className="flex items-center gap-2">
                <span>{task.reporterName || "Leader"}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground w-24">
                Priority
              </span>
              <div className="flex-1">
                <UpdatePriority task={task} onClose={() => {}} />
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground w-24">
                Due date
              </span>
              <div className="flex-1">
                <UpdateDueDate task={task} onClose={() => {}} />
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground w-24">
                Created
              </span>
              <span className="text-sm">{getDate(task.createdDate)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground w-24">
                Updated
              </span>
              <span className="text-sm">{task.lastUpdatedDate ? getDate(task.lastUpdatedDate) : "Not yet"  }</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground w-24">
              Completion Date
              </span>
              <span className="text-sm">{task.completionDate ? getDate(task.completionDate) : "Not yet"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
