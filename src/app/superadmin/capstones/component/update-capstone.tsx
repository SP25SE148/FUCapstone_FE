"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCapstone } from "@/contexts/capstone-context";

interface Capstone {
  id: string;
  majorId: string;
  name: string;
  minMember: number;
  maxMember: number;
  reviewCount: number;
  isDeleted: boolean;
  deletedAt: string | null;
}

export default function UpdateCapstone({
  capstone,
  open,
  setOpen,
}: {
  capstone: Capstone;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { updateCapstone } = useCapstone();
  const [capstoneName, setCapstoneName] = useState(capstone.name);
  const [majorId, setMajorId] = useState(capstone.majorId);
  const [minMember, setMinMember] = useState(capstone.minMember);
  const [maxMember, setMaxMember] = useState(capstone.maxMember);
  const [reviewCount, setReviewCount] = useState(capstone.reviewCount);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      capstoneName &&
      majorId &&
      minMember > 0 &&
      maxMember > 0 &&
      reviewCount > 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [capstoneName, majorId, minMember, maxMember, reviewCount]);

  const handleUpdateCapstone = async () => {
    const data = {
      id: capstone.id,
      majorId,
      name: capstoneName,
      minMember,
      maxMember,
      reviewCount,
      isDeleted: capstone.isDeleted,
      deletedAt: capstone.deletedAt,
    };
    await updateCapstone(data);
    setOpen(false); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update capstone</DialogTitle>
          <DialogDescription>
            Update the details of the capstone below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="capstoneName">Capstone Name</Label>
            <Input
              id="capstoneName"
              placeholder="Ex: Capstone Project"
              value={capstoneName}
              onChange={(e) => setCapstoneName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="majorId">Major ID</Label>
            <Input
              id="majorId"
              placeholder="Ex: CS"
              value={majorId}
              onChange={(e) => setMajorId(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="minMember">Min Member</Label>
            <Input
              id="minMember"
              type="number"
              placeholder="Ex: 3"
              value={minMember}
              onChange={(e) => setMinMember(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="maxMember">Max Member</Label>
            <Input
              id="maxMember"
              type="number"
              placeholder="Ex: 5"
              value={maxMember}
              onChange={(e) => setMaxMember(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="reviewCount">Review Count</Label>
            <Input
              id="reviewCount"
              type="number"
              placeholder="Ex: 2"
              value={reviewCount}
              onChange={(e) => setReviewCount(Number(e.target.value))}
            />
          </div>
        </div>
        <Button
          className="w-full mt-4"
          onClick={handleUpdateCapstone}
          disabled={!isFormValid}
        >
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
}
