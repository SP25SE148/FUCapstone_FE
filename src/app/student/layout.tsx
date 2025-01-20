"use client"

import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import StudentTaskbar from "@/app/student/components/student-taskbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean).slice(1);

  return (
    <div className="bg-muted">
      <main className=" p-4">
        {children}
        <StudentTaskbar />
      </main>
    </div>
  );
}