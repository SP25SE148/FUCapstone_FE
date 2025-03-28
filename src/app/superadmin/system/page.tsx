"use client"

import { useSuperadminSystem } from "@/contexts/superadmin/superadmin-system-context"
import { InputGroup } from "@/app/superadmin/system/components/update-config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Users, Clock, Shield, BookOpen, RefreshCw } from "lucide-react"

export default function SystemConfigPage() {
  const {
    systemConfig,
    updateMaxTopicsForCoSupervisors,
    updateMaxTopicAppraisalsForTopic,
    updateExpirationTopicRequestDuration,
    updateExpirationTeamUpDuration,
    updateMaxAttemptTimesToDefendCapstone,
    updateMaxAttemptTimesToReviewTopic,
  } = useSuperadminSystem()

  if (!systemConfig) return <div className="flex items-center justify-center h-64">Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <Card className="border-none shadow-md">
        <CardHeader className="bg-primary/5 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">System Configuration</CardTitle>
          </div>
          <CardDescription>Manage System Configuration</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="supervisors" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="supervisors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Supervisors</span>
              </TabsTrigger>
              <TabsTrigger value="timeouts" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Timeouts</span>
              </TabsTrigger>
              <TabsTrigger value="attempts" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>Attempts</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="supervisors" className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Maximum topics for co-supervisors"
                    value={systemConfig.maxTopicsForCoSupervisors}
                    onSave={(value) => updateMaxTopicsForCoSupervisors({ value })}
                    icon={<BookOpen className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Maximum topic appraisals per topic"
                    value={systemConfig.maxTopicAppraisalsForTopic}
                    onSave={(value) => updateMaxTopicAppraisalsForTopic({ value })}
                    icon={<Shield className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeouts" className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Topic request expiration duration"
                    value={systemConfig.expirationTopicRequestDuration}
                    onSave={(value) => updateExpirationTopicRequestDuration({ value })}
                    icon={<Clock className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Team-up expiration duration"
                    value={systemConfig.expirationTeamUpDuration}
                    onSave={(value) => updateExpirationTeamUpDuration({ value })}
                    icon={<Users className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attempts" className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Maximum attempts to defend capstone"
                    value={systemConfig.maxAttemptTimesToDefendCapstone}
                    onSave={(value) => updateMaxAttemptTimesToDefendCapstone({ value })}
                    icon={<Shield className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Maximum attempts to review topic"
                    value={systemConfig.maxAttemptTimesToReviewTopic}
                    onSave={(value) => updateMaxAttemptTimesToReviewTopic({ value })}
                    icon={<RefreshCw className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

