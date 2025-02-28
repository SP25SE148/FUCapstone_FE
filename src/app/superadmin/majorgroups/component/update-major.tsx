"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-context";
import { Major } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";



export default function UpdateMajor({ major, open, setOpen }: { major: Major, open: boolean, setOpen: (open: boolean) => void }) {
  const { updateMajor } = useMajorGroup();
  const [majorName, setMajorName] = useState(major.name);
  const [description, setDescription] = useState(major.description);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (majorName && description) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [majorName, description]);

  const handleUpdateMajor = async () => {
    const data = {
      id: major.id,
      majorGroupId: major.majorGroupId,
      name: major.name,
      description,
      isDeleted: major.isDeleted,
      deletedAt: major.deletedAt,
    };
    await updateMajor(data);
    setOpen(false); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update major</DialogTitle>
          <DialogDescription>Update the details of the major below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="majorName">Major Name</Label>
            <Input
              id="majorName"
              placeholder="Ex: Business"
              value={majorName}
              onChange={(e) => setMajorName(e.target.value)}
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
        <Button className="w-full mt-4" onClick={handleUpdateMajor} disabled={!isFormValid}>
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
}