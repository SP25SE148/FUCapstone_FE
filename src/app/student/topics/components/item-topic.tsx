"use client"

import { useState } from "react"
import { BriefcaseBusiness, Building2, GraduationCap, Users } from "lucide-react"

import type { Topic } from "@/types/types"
import { getTopicDifficulty } from "@/utils/statusUtils"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TopicSheet from "@/app/student/topics/components/topic-sheet"

export default function ItemTopic({ topic }: { topic: Topic }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card
        className="overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-md"
        onClick={() => setOpen(true)}
      >
        <div className="p-4 cursor-pointer hover:bg-primary/5 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/5 text-xs font-normal">
              {topic?.code}
            </Badge>
            {topic?.abbreviation && (
              <Badge variant="outline" className="bg-primary/5 text-xs font-normal">
                {topic?.abbreviation}
              </Badge>
            )}
          </div>

          <div className="hidden md:grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <h3 className="font-semibold tracking-tight text-base text-primary truncate" title={topic?.englishName}>
                {topic?.englishName}
              </h3>
              <p className="text-xs text-muted-foreground truncate" title={topic?.vietnameseName}>
                {topic?.vietnameseName}
              </p>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Supervisor:</span>
                </div>
                <p className="text-sm truncate" title={topic?.mainSupervisorName}>
                  {topic?.mainSupervisorName}
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Business Area:</span>
                </div>
                <p className="text-sm truncate" title={topic?.businessAreaName}>
                  {topic?.businessAreaName}
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <BriefcaseBusiness className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Difficulty:</span>
                </div>
                <div className="mt-0.5">{getTopicDifficulty(topic?.difficultyLevel)}</div>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Requests:</span>
                </div>
                <p className="text-sm font-medium">{topic?.numberOfTopicRequest}</p>
              </div>
            </div>
          </div>

          <div className="md:hidden space-y-2">
            <div>
              <h3 className="font-semibold tracking-tight text-base text-primary" title={topic?.englishName}>
                {topic?.englishName}
              </h3>
              <p className="text-xs text-muted-foreground" title={topic?.vietnameseName}>
                {topic?.vietnameseName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Supervisor:</span>
                  </div>
                  <p className="text-xs truncate" title={topic?.mainSupervisorName}>
                    {topic?.mainSupervisorName}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Business Area:</span>
                  </div>
                  <p className="text-xs truncate" title={topic?.businessAreaName}>
                    {topic?.businessAreaName}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Difficulty:</span>
                  </div>
                  <div className="mt-0.5 scale-90 origin-left">{getTopicDifficulty(topic?.difficultyLevel)}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Requests:</span>
                  </div>
                  <p className="text-xs font-medium">{topic?.numberOfTopicRequest}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <TopicSheet topic={topic} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
