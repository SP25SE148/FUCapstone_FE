"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { useStudentTopics } from "@/contexts/student/student-topic-context";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface RegisterTopicProps {
  topicId: string;
  groupId: string;
}

export default function RegisterTopic({ topicId, groupId }: RegisterTopicProps) {
  const { createTopicRequest } = useStudentTopics();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createTopicRequest(topicId, groupId);
      console.log("Topic registered successfully");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Send />
          Register
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Registration</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to register this topic?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            No
          </Button>
          <Button onClick={handleRegister} disabled={loading}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}