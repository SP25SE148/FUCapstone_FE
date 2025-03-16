"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Mail, BadgeIcon as IdCard } from "lucide-react";
import { useManagerTopics } from "@/contexts/manager/manager-topic-context";

interface AssignSupervisorProps {
  topicId: string;
  onClose: () => void;
}

export default function AssignSupervisor({ topicId, onClose }: AssignSupervisorProps) {
  const { fetchAssignSupervisor, assignTopicAppraisalForSpecificSupervisor } = useManagerTopics();
  const [supervisors, setSupervisors] = useState<{ id: string; fullName: string; email: string }[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAssignSupervisor();
      setSupervisors(data || []);
    };

    fetchData();
  }, [fetchAssignSupervisor]);

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
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden rounded-lg">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold">Assign Supervisor</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select a supervisor from the list below to assign to this topic.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/40 border-muted"
            />
          </div>
        </div>

        <div className="px-6 py-2 max-h-[400px] overflow-y-auto">
          {filteredSupervisors.length > 0 ? (
            <RadioGroup value={selectedSupervisor} onValueChange={setSelectedSupervisor} className="space-y-3 py-2">
              {filteredSupervisors.map((supervisor) => (
                <div
                  key={supervisor.id}
                  className={`flex items-start space-x-3 rounded-lg border p-4 transition-all duration-200 
                    ${
                      selectedSupervisor === supervisor.id
                        ? "border-primary/50 bg-primary/5 shadow-sm"
                        : "hover:bg-muted/50 hover:border-muted-foreground/20"
                    }`}
                >
                  <RadioGroupItem value={supervisor.id} id={supervisor.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={supervisor.id} className="flex flex-col cursor-pointer">
                      <span className="font-semibold text-lg flex items-center gap-2">
                        {supervisor.fullName}
                      </span>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <IdCard className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                          <span>{supervisor.id}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                          <span>{supervisor.email}</span>
                        </div>
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

        <DialogFooter className="px-6 py-4 bg-muted/30 border-t">
          <div className="flex gap-3 w-full sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedSupervisor}
              className={`${!selectedSupervisor ? "opacity-50" : "opacity-100"} transition-opacity`}
            >
              Assign Supervisor
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}