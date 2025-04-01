"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useSupervisorDefense } from "@/contexts/supervisor/supervisor-defense-context";

interface ContinueDefenseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defendCapstoneCalendarId: string; 
}

const ContinueDefense: React.FC<ContinueDefenseProps> = ({
  open,
  onOpenChange,
  defendCapstoneCalendarId,
}) => {
  const { updatePresidentDecisionForGroupStatus } = useSupervisorDefense();
  const [selectedOption, setSelectedOption] = useState("2nd Defense");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const isReDefend = selectedOption === "2nd Defense";

    const requestData = {
      IsReDefendCapstoneProject: isReDefend,
      CalendarId: defendCapstoneCalendarId,
    };

    setIsSaving(true);
    try {
      await updatePresidentDecisionForGroupStatus(requestData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating decision:", error);
      alert("Failed to update decision. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Continue Defense</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
        <iframe
            className="w-full h-[540px]"
            src={`https://docs.google.com/gview?url=${encodeURIComponent("")}&embedded=true`}
          />
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedOption === "2nd Defense" ? "default" : "outline"}
              className={`h-12 ${
                selectedOption === "2nd Defense"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
              onClick={() => setSelectedOption("2nd Defense")}
            >
              2nd Defense
            </Button>
            <Button
              variant={selectedOption === "Finish" ? "default" : "outline"}
              className={`h-12 ${
                selectedOption === "Finish"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
              onClick={() => setSelectedOption("Finish")}
            >
              Finish
            </Button>
          </div>
          <Button className="w-full" onClick={handleSave} disabled={isSaving}>
            <ArrowRight className="mr-2" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContinueDefense;