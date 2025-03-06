"use client"

import React from "react";

import { SuperadminTemplateProvider } from "@/contexts/superadmin/superadmin-template-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SuperadminTemplateProvider>
            {children}
        </SuperadminTemplateProvider>
    )
}
