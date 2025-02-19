"use client";

import React, { useEffect } from "react";
import StudentTaskbar from "@/app/student/components/student-taskbar";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const studentInfoUpdated = localStorage.getItem("studentInfoUpdated");
    if (!studentInfoUpdated) {
      router.push("/student/update-information");
    }
  }, [router]);

  return (
    <div className="p-2 min-h-screen bg-muted">
      <StudentTaskbar />
      <div className="ml-[68px]">
        {children}
      </div>
    </div>
  );
}