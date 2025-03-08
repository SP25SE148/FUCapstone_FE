"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Topic } from "@/contexts/student/student-topic-context";
import DownloadDocument from "@/app/student/topics/components/download-document";
import RegisterTopic from "@/app/student/topics/components/register-topic";

interface TopicSheetProps {
  topic: Topic;
  open: boolean;
  onClose: () => void;
}

export default function TopicSheet({ topic, open, onClose }: TopicSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-1/2 sm:max-w-[50%] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>{topic.englishName}</SheetTitle>
          <SheetDescription>
            View detailed information about the selected topic
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Abbreviations:
            </h3>
            <p>{topic.abbreviation}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Vietnamese Title:
            </h3>
            <p>{topic.vietnameseName}</p>
          </div>

          <div className="flex gap-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Profession:
              </h3>
              <p>{topic.businessAreaName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Specialty:
              </h3>
              <p>{topic.capstoneId}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description:
            </h3>
            <p className="text-sm leading-6">{topic.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Supervisor:
            </h3>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {topic.mainSupervisorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{topic.mainSupervisorName}</p>
                <p className="text-sm text-muted-foreground">
                  {topic.mainSupervisorEmail}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <DownloadDocument topic={topic} />
            <RegisterTopic topicId={topic.id} />
          </div>
        </div>
        <SheetClose asChild>
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded">
            Close
          </button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}