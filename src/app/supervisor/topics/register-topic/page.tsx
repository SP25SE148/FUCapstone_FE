import { SupervisorTopicRegisterProvider } from "@/contexts/supervisor/supervisor-topic-register-context";

import RegisterTopicForm from "@/app/supervisor/topics/register-topic/components/register-topic-form";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterTopicPage() {
  return (
    <SupervisorTopicRegisterProvider>
      <Card className="min-h-[calc(100vh-60px)]">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl text-primary">
            Register New Topic
          </CardTitle>
          <CardDescription>
            Fill in the required information to register a new topic
          </CardDescription>
        </CardHeader>
        <RegisterTopicForm />
      </Card>
    </SupervisorTopicRegisterProvider>
  );
}