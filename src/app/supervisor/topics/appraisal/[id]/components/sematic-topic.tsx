"use client";

import { useState } from "react";
import { Database, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSupervisorTopicAppraisal } from "@/contexts/supervisor/supervisor-topic-appraisal-context";
import { cn } from "@/lib/utils";

export default function SematicTopic() {
  const { semanticTopicForAppraisalSupervisor } = useSupervisorTopicAppraisal();
  const params = useParams();
  const id: string = String(params.id);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSematicTopic = async () => {
    setIsLoading(true);
    try {
      await semanticTopicForAppraisalSupervisor(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <Alert
            className={cn(
              "relative max-w-2xl w-full py-5 bg-background/90 shadow-lg border border-border animate-in fade-in duration-300"
            )}
          >
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <AlertDescription className="text-center text-nowrap text-lg font-medium py-2">
                The operation will take some time. Please wait a moment....
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}

      <Button onClick={handleSematicTopic} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Database className="mr-2" />
        )}
        Sematic
      </Button>
    </>
  );
}
