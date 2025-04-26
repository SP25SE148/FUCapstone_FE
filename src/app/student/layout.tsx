"use client";

import React, { useState } from "react";

import { StudentProfileProvider } from "@/contexts/student/student-profile-context";

import Info from "./components/info";
import StudentTaskbar from "@/app/student/components/student-taskbar";
import { Menu, X } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTaskbarVisible, setIsTaskbarVisible] = useState(false);

  const toggleTaskbar = () => {
    setIsTaskbarVisible((prev) => !prev);
  };

  return (
    <StudentProfileProvider>
      <div className="p-2 min-h-screen bg-muted relative">
        {!isTaskbarVisible ? (
          <button
            className="sm:hidden fixed top-2 left-2 p-2 text-primary border border-spacing-1 border-primary bg-muted rounded-full shadow-lg z-50"
            onClick={toggleTaskbar}
          >
            <Menu className="h-6 w-6" />
          </button>
        ) : 
          
          <button
            className="sm:hidden fixed top-2 left-16 p-2 text-primary border border-spacing-1 border-primary bg-muted rounded-full shadow-lg z-auto"
            onClick={toggleTaskbar}
          >
            <X className="h-6 w-6" />
          </button>
        }

        {isTaskbarVisible && (
          <div
            className="fixed inset-0 bg-black/80 z-50 sm:hidden"
            onClick={toggleTaskbar}
          >
            <div
              className="absolute left-0 top-0 h-full w-auto bg-primary shadow-lg"
            >
              <StudentTaskbar />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row">
          <div className="hidden sm:block sm:fixed sm:left-2 sm:top-0 sm:h-full sm:w-[68px]">
            <StudentTaskbar />
          </div>

          <div className="flex-1 sm:ml-[68px]">{children}</div>
        </div>

        <Info />
      </div>
    </StudentProfileProvider>
  );
}
