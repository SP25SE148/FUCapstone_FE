"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCampusApi } from "@/hooks/use-campus-api";

interface Campus {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
}

export default function UpdateCampus({ campus, open, setOpen }: { campus: Campus, open: boolean, setOpen: (open: boolean) => void }) {
  const { updateCampus } = useCampusApi();
  const [campusName, setCampusName] = useState(campus.name);
  const [campusCode, setCampusCode] = useState(campus.id);
  const [address, setAddress] = useState(campus.address);
  const [phone, setPhone] = useState(campus.phone);
  const [email, setEmail] = useState(campus.email);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (campusName && campusCode && address && phone && email) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [campusName, campusCode, address, phone, email]);

  const handleUpdateCampus = async () => {
    const data = {
      id: campusCode,
      name: campusName,
      address,
      phone,
      email,
      isDeleted: campus.isDeleted,
      createdDate: campus.createdDate,
      updatedDate: new Date().toISOString(),
      createdBy: campus.createdBy,
      updatedBy: "admin",
      deletedAt: campus.deletedAt,
    };
    await updateCampus(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update campus</DialogTitle>
          <DialogDescription>Update the details of the campus below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="campusName">Campus Name</Label>
            <Input
              id="campusName"
              placeholder="Ex: FPT University Hanoi"
              value={campusName}
              onChange={(e) => setCampusName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="campusCode">Campus Code</Label>
            <Input
              id="campusCode"
              placeholder="Ex: FUH"
              value={campusCode}
              onChange={(e) => setCampusCode(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Ex: Hoa Lac, Hanoi"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Ex: 0123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Ex: contact@fpt.edu.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <Button className="w-full mt-4" onClick={handleUpdateCampus} disabled={!isFormValid}>
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
}