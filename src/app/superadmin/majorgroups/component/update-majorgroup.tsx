"use client";

import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";

import { MajorGroup } from "@/types/types";
import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-context";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function UpdateMajorGroup({ majorGroup, open, setOpen }: { majorGroup: MajorGroup, open: boolean, setOpen: (open: boolean) => void }) {
  const { updateMajorGroup } = useMajorGroup();
  const [isFormValid, setIsFormValid] = useState(false);
  const [majorGroupName, setMajorGroupName] = useState(majorGroup.name);
  const [description, setDescription] = useState(majorGroup.description);

  useEffect(() => {
    if (majorGroupName && description) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [majorGroupName, description]);

  const handleUpdateMajorGroup = async () => {
    const data = {
      id: majorGroup.id,
      name: majorGroupName,
      description,
      isDeleted: majorGroup.isDeleted,
      deletedAt: majorGroup.deletedAt,
    };
    await updateMajorGroup(data);
    setOpen(false); // Close the dialog after updating
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update major group</DialogTitle>
          <DialogDescription>Update the details of the major group below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
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
        <Button className="w-full mt-4" onClick={handleUpdateMajorGroup} disabled={!isFormValid}>
          <Pencil />
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
}