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
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <div className="flex items-center gap-2 px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {paths.length == 0
                ? <BreadcrumbPage>Dashboard</BreadcrumbPage>
                : paths.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {index === paths.length - 1 ? (
                          <BreadcrumbPage>{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={`/student/${crumb}`}>{crumb.charAt(0).toUpperCase() + crumb.slice(1)}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main>
        {children}
        <StudentTaskbar />
      </main>
    </div>
  );
}