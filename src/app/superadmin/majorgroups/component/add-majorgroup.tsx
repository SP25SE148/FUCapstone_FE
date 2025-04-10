"use client";

import { CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";

import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-context";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AddMajorGroup() {
  const { addMajorGroup } = useMajorGroup();

  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [description, setDescription] = useState("");
  const [majorGroupId, setMajorGroupId] = useState("");
  const [majorGroupName, setMajorGroupName] = useState("");

  useEffect(() => {
    if (majorGroupId && majorGroupName && description) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [majorGroupId, majorGroupName, description]);

  const handleAddMajorGroup = async () => {
    const data = {
      id: majorGroupId,
      name: majorGroupName,
      description,
      isDeleted: false,
      deletedAt: null,
    };
    await addMajorGroup(data);
    setOpen(false); // Close the dialog after adding
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-6">
          <CirclePlus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new major group</DialogTitle>
          <DialogDescription>Fill information to add new major group</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="majorGroupId">Major Group ID</Label>
            <Input
              id="majorGroupId"
              placeholder="Ex: BUS"
              value={majorGroupId}
              onChange={(e) => setMajorGroupId(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="majorGroupName">Major Group Name</Label>
            <Input
              id="majorGroupName"
              placeholder="Ex: Business"
              value={majorGroupName}
              onChange={(e) => setMajorGroupName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Ex: Business-related majors."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <Button className="w-full mt-4" onClick={handleAddMajorGroup} disabled={!isFormValid}>
          <CirclePlus />
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
}