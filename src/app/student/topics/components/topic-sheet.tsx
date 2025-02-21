"use client";

import { Topic } from "@/app/student/topics/type";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
          <SheetTitle>{topic.enName}</SheetTitle>
          <SheetDescription>View detailed information about the selected topic</SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Abbreviations:</h3>
            <p>{topic.abbreviations}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Vietnamese Title:</h3>
            <p>{topic.vietnameseTitle}</p>
          </div>

          <div className="flex gap-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Profession:</h3>
              <p>{topic.profession}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Specialty:</h3>
              <p>{topic.specialty}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description:</h3>
            <p className="text-sm leading-6">{topic.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Supervisor:</h3>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {topic.supervisor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{topic.supervisor.name}</p>
                <p className="text-sm text-muted-foreground">{topic.supervisor.email}</p>
              </div>
            </div>
          </div>

          {topic.status !== "Assigned" && (
            <div className="flex gap-4">
              <Button variant="secondary">Document</Button>
              <Button>Register topic</Button>
            </div>
          )}
        </div>
        <SheetClose asChild>
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded">Close</button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}