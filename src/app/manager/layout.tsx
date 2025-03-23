"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Users, ClipboardCheck, ShieldCheck } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import withAuth from "@/components/layout/withAuth"

const items = [
    {
        title: "Dashboard",
        url: "/manager",
        icon: LayoutDashboard,
    },
    {
        title: "Topics",
        url: "#",
        icon: FileText,
        children: [
            {
                title: "List topics",
                url: "/manager/topics",
            },
            {
                title: "Assign appraisal",
                url: "/manager/topics/assign-appraisal",
            }
        ]
    },
    {
        title: "Groups",
        url: "/manager/groups",
        icon: Users,
    },
    {
        title: "Reviews",
        url: "/manager/reviews",
        icon: ClipboardCheck,
    },
    {
        title: "Defenses",
        url: "/manager/defenses",
        icon: ShieldCheck,
    },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(Boolean).slice(1)

    return (
        <SidebarProvider>
            <AppSidebar items={items} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {paths.length == 0
                                    ?
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                    :
                                    <>
                                        {paths.map((crumb, index) => (
                                            <React.Fragment key={index}>
                                                {index > 0 && <BreadcrumbSeparator />}
                                                <BreadcrumbItem>
                                                    {index === paths.length - 1 ? (
                                                        <BreadcrumbPage>{paths[index].charAt(0).toUpperCase() + paths[index].slice(1)}</BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink href={`/manager/${paths[index]}`}>{paths[index].charAt(0).toUpperCase() + paths[index].slice(1)}</BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            </React.Fragment>
                                        ))}
                                    </>
                                }
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="flex-1 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
