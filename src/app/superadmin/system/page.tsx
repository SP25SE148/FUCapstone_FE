"use client"

import { Settings, Users, Clock, Shield, BookOpen, RefreshCw, Info, BrainCircuit, FileCheck2 } from "lucide-react"

import { useSuperadminSystem } from "@/contexts/superadmin/superadmin-system-context"

import { Separator } from "@/components/ui/separator"
import { InputGroup } from "@/app/superadmin/system/components/update-config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SystemConfigPage() {
  const {
    systemConfig,
    updateMaxTopicsForCoSupervisors,
    updateMaxTopicAppraisalsForTopic,
    updateExpirationTopicRequestDuration,
    updateExpirationTeamUpDuration,
    updateMaxAttemptTimesToDefendCapstone,
    updateMaxAttemptTimesToReviewTopic,
    updateSemanticTopicThroughSemesters
  } = useSuperadminSystem()

  if (!systemConfig) return <div className="flex items-center justify-center h-64">Loading...</div>

  return (
    <Card className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-primary/5 to-background">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <div className="flex items-center gap-4">
          <Settings className="h-6 w-6 text-primary" />
          <CardTitle className="font-semibold tracking-tight text-xl text-primary">System Configuration</CardTitle>
        </div>
        <CardDescription>Manage system-wide settings and limitations</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
        <div className="p-4 rounded-lg border border-primary/90  flex items-start gap-3 mt-2">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-primary">System Configuration Notes</h4>
              <p className="text-sm text-primary">
                Changes to these settings will affect system-wide behavior. Please ensure you understand the
                implications before making changes.
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Supervisor Settings</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Maximum topics for co-supervisors"
                    value={systemConfig.maxTopicsForCoSupervisors}
                    onSave={(value) => updateMaxTopicsForCoSupervisors(value)}
                    icon={<BookOpen className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Maximum topic appraisals per topic"
                    value={systemConfig.maxTopicAppraisalsForTopic}
                    onSave={(value) => updateMaxTopicAppraisalsForTopic(value)}
                    icon={<Shield className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Timeout Settings</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Topic request expiration duration (hours)"
                    value={systemConfig.expirationTopicRequestDuration}
                    onSave={(value) => updateExpirationTopicRequestDuration(value)}
                    icon={<Clock className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Team-up expiration duration (hours)"
                    value={systemConfig.expirationTeamUpDuration}
                    onSave={(value) => updateExpirationTeamUpDuration(value)}
                    icon={<Users className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Attempt Limits</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Maximum attempts to defend capstone"
                    value={systemConfig.maxAttemptTimesToDefendCapstone}
                    onSave={(value) => updateMaxAttemptTimesToDefendCapstone(value)}
                    icon={<Shield className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Maximum attempts to review topic"
                    value={systemConfig.maxAttemptTimesToReviewTopic}
                    onSave={(value) => updateMaxAttemptTimesToReviewTopic(value)}
                    icon={<RefreshCw className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">AI Semantic Checking</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <InputGroup
                    label="Checking in the last ... semesters"
                    value={systemConfig.semanticTopicThroughSemesters}
                    onSave={(value) => updateSemanticTopicThroughSemesters(value)}
                    icon={<FileCheck2 className="h-5 w-5 text-muted-foreground" />}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

