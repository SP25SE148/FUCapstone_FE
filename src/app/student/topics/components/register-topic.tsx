"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useStudentTopics } from "@/contexts/student/student-topic-context";
import { toast } from "sonner";

interface RegisterTopicProps {
  topicId: string;
}

export default function RegisterTopic({ topicId }: RegisterTopicProps) {
  const { getGroupInfoByStudentId, createTopicRequest } = useStudentTopics();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const groupInfo = await getGroupInfoByStudentId();
      await createTopicRequest(topicId, groupInfo.id);
    } catch (error) {
      toast.error("Failed to register topic", {
        description: `${error}`,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button className="h-12 text-white" onClick={() => setOpen(true)}>Register topic</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              Are you sure you want to register this topic?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              No
            </Button>
            <Button onClick={handleRegister} disabled={loading}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}