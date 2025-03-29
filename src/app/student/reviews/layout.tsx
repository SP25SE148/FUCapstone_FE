"use client";

import React from "react";
import { Tabs } from "@/components/layout/app-tabs";
import { StudentReviewProvider } from "@/contexts/student/student-review-context";

const items = [
  { label: "Reviews", href: "/student/reviews" },
  { label: "Results", href: "/student/reviews/results" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StudentReviewProvider>
      <div className="flex flex-col gap-2">
        <Tabs items={items} />
        {children}
      </div>
    </StudentReviewProvider>
  );
}
