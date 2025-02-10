"use client";

import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCapstone } from "@/contexts/capstone-context";

export default function AddCapstone() {
  const { addCapstone } = useCapstone();
  const [capstoneId, setCapstoneId] = useState("");
  const [capstoneName, setCapstoneName] = useState("");
  const [majorId, setMajorId] = useState("");
  const [minMember, setMinMember] = useState(0);
  const [maxMember, setMaxMember] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (capstoneId && capstoneName && majorId && minMember > 0 && maxMember > 0 && reviewCount > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [capstoneId, capstoneName, majorId, minMember, maxMember, reviewCount]);

  const handleAddCapstone = async () => {
    const data = {
      id: capstoneId,
      majorId,
      name: capstoneName,
      minMember,
      maxMember,
      reviewCount,
      isDeleted: false,
      deletedAt: null,
    };
    await addCapstone(data);
    setOpen(false); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <CirclePlus />
          Add Capstone
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new capstone</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="capstoneId">Capstone ID</Label>
            <Input
              id="capstoneId"
              placeholder="Ex: CS101"
              value={capstoneId}
              onChange={(e) => setCapstoneId(e.target.value)}
            />
          </div>
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
        <Button className="w-full mt-4" onClick={handleAddCapstone} disabled={!isFormValid}>
          <CirclePlus />
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
}