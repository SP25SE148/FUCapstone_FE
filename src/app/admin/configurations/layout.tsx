"use client"

import React from "react"

import { AdminConfigProvider } from "@/contexts/admin/admin-config-context"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AdminConfigProvider>
            {children}
        </AdminConfigProvider>
    )
}
