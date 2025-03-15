"use client"

import InvitationSent from "./invitation-sent";
import ApplicationSent from "./application-sent";
import InvitationReceived from "./invitation-received";
import ApplicationReceived from "./application-received";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ListRequest() {
  return (
    <Card className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-primary/5 to-background">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">List Request</CardTitle>
        <CardDescription>Information about your request</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="invitation-sent" className="w-full">
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
  );
}
