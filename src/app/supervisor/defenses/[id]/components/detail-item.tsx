"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MessageCircleMore, MessageCirclePlus, RotateCw, User2 } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ReviewResult } from "@/types/types"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DetailItem({ result }: { result: ReviewResult }) {
  const [showDetail, setShowDetail] = useState<boolean>(false)

  return (
    <Card
      className=
        "overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div
        className={cn(
          "flex items-center justify-between bg-gradient-to-r from-primary/10 to-primary/5 p-4 cursor-pointer",
          !showDetail && "rounded-xl",
        )}
        onClick={() => {
          setShowDetail(!showDetail)
        }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary/5 p-2 rounded-full">
            <RotateCw className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl text-primary flex items-center gap-2">
              Review {result?.attempt}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {result.reviewCalendarResultDetailList.length} reviewer
              {result.reviewCalendarResultDetailList.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="bg-primary/5 p-1.5 rounded-full transition-transform duration-300">
          {showDetail ? <ChevronUp className="size-4 text-primary" /> : <ChevronDown className="size-4 text-primary" />}
        </div>
      </div>

      {showDetail && (
        <CardContent
          className={cn(
            "p-5 space-y-5 bg-gradient-to-b from-primary/5 to-transparent",
            "animate-in fade-in-50 duration-300",
          )}
        >
          {result.reviewCalendarResultDetailList.map((review, reviewIndex) => (
            <Card
              key={reviewIndex}
              className="border border-primary/5 shadow-sm hover:shadow transition-all duration-200"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-primary/10">
                  <Avatar className="size-10 border-2 border-primary/20 shadow-sm">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                      <User2 className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-primary">{review?.author}</p>
                    <Badge variant="secondary" className="mt-1 text-xs font-normal">
                      Reviewer {reviewIndex + 1}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm flex items-center gap-2 text-primary">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <MessageCircleMore className="size-4 text-primary" />
                    </div>
                    Comment
                  </h3>
                  <div className="ml-8 text-sm p-3 rounded-lg border">
                    {review.comment === "undefined" ? (
                      <span className="text-muted-foreground italic">No comment provided</span>
                    ) : (
                      <p className="font-medium text-primary leading-relaxed text-justify">{review.comment}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-sm flex items-center gap-2 text-primary">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <MessageCirclePlus className="size-4 text-primary" />
                    </div>
                    Suggestion
                  </h3>
                  <div className="ml-8 text-sm p-3 rounded-lg border">
                    {review.suggestion === "undefined" ? (
                      <span className="text-muted-foreground italic">No suggestion provided</span>
                    ) : (
                      <p className="font-medium text-primary leading-relaxed text-justify">{review.suggestion}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      )}
    </Card>
  )
}
