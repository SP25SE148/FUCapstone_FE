"use client";

import { useState, useEffect } from "react";
import { Search, Mail, UserPen } from "lucide-react";

import { useManagerTopics } from "@/contexts/manager/manager-topic-context";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, } from "@/components/ui/dialog";

interface AssignSupervisorProps {
  topicId: string;
  onClose: () => void;
}

export default function AssignSupervisor({ topicId, onClose }: AssignSupervisorProps) {
  const { supervisors, fetchSupervisorList, assignTopicAppraisalForSpecificSupervisor } = useManagerTopics();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");

  useEffect(() => {
    fetchSupervisorList();
  }, []);

  const filteredSupervisors = supervisors.filter(
    (supervisor) =>
      supervisor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supervisor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supervisor.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    const response = await assignTopicAppraisalForSpecificSupervisor({
      TopicId: topicId,
      SupervisorId: selectedSupervisor,
    });

    if (response?.isSuccess) {
      onClose(); // Close the dialog if successful
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Supervisor</DialogTitle>
          <DialogDescription>
            Select a supervisor from the list below to assign to this topic.
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/40 border-muted"
          />
        </div>

        <div className="h-[400px] space-y-2 overflow-y-auto">
          {filteredSupervisors.length > 0 ? (
            <RadioGroup value={selectedSupervisor} onValueChange={setSelectedSupervisor} className="space-y-3 py-2">
              {filteredSupervisors.map((supervisor) => (
                <div
                  key={supervisor.id}
                  className={`flex items-center space-x-3 rounded-lg border p-2 transition-all duration-200 
                    ${selectedSupervisor === supervisor.id
                      ? "border-primary/50 bg-primary/5 shadow-sm"
                      : "hover:bg-muted/50 hover:border-muted-foreground/20"
                    }`}
                >
                  <RadioGroupItem value={supervisor.id} id={supervisor.id} />
                  <div className="flex-1">
                    <Label htmlFor={supervisor.id} className="cursor-pointer">
                      <p className="font-semibold text-lg flex items-center gap-2 text-primary">
                        {supervisor.fullName} - {supervisor.id}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="size-4" />
                        <span>{supervisor.email}</span>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="py-8 text-center text-muted-foreground">No supervisors found matching your search.</div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedSupervisor}
            className={`${!selectedSupervisor ? "opacity-50" : "opacity-100"} transition-opacity`}
          >
            <UserPen />
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}