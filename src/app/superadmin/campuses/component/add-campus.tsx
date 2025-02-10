"use client";

import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCampus } from "@/contexts/campus-context";

export default function AddCampus() {
  const { addCampus } = useCampus();
  const [campusName, setCampusName] = useState("");
  const [campusCode, setCampusCode] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (campusName && campusCode && address && phone && email) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [campusName, campusCode, address, phone, email]);

  const handleAddCampus = async () => {
    const data = {
      id: campusCode,
      name: campusName,
      address,
      phone,
      email,
      isDeleted: false,
      createdDate: new Date().toISOString(),
      updatedDate: null,
      createdBy: "admin",
      updatedBy: null,
      deletedAt: null,
    };
    await addCampus(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <CirclePlus />
          Add Campus
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new campus</DialogTitle>
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
        <Button className="w-full mt-4" onClick={handleAddCampus} disabled={!isFormValid}>
          <CirclePlus />
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
}