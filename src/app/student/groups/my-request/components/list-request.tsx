"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import InvitationSent from "./invitation-sent"
import ApplicationSent from "./application-sent"
import InvitationReceived from "./invitation-received"
import ApplicationReceived from "./application-received"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ListRequest() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState<string>("invitation-sent")

  // Set default tab in URL if not present
  useEffect(() => {
    if (pathname === "/student/groups/my-request" && !tabParam) {
      router.replace(`${pathname}?tab=invitation-sent`, { scroll: false })
    }
  }, [pathname, tabParam, router])

  // Set the active tab based on URL parameter or default to "invitation-sent"
  useEffect(() => {
    const validTabs = ["invitation-sent", "invitation-received", "application-sent", "application-received"]
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", value)

    // Update the URL without refreshing the page
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Card className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-primary/5 to-background">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">List Request</CardTitle>
        <CardDescription>Information about your request</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="invitation-sent">Invitation sent</TabsTrigger>
            <TabsTrigger value="invitation-received">Invitation received</TabsTrigger>
            <TabsTrigger value="application-sent">Application sent</TabsTrigger>
            <TabsTrigger value="application-received">Application received</TabsTrigger>
          </TabsList>
          <TabsContent value="invitation-sent">
            <InvitationSent />
          </TabsContent>
          <TabsContent value="invitation-received">
            <InvitationReceived />
          </TabsContent>
          <TabsContent value="application-sent">
            <ApplicationSent />
          </TabsContent>
          <TabsContent value="application-received">
            <ApplicationReceived />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
