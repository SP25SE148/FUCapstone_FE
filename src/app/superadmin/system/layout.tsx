"use client";

import React from "react";

import { SuperadminSystemProvider } from "@/contexts/superadmin/superadmin-system-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SuperadminSystemProvider>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </SuperadminSystemProvider>
  );
}
