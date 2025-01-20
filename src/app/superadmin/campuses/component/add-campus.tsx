import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AddCampus() {
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
            <Input id="campusName" placeholder="Ex: FPT University Hanoi" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="campusCode">Campus Code</Label>
            <Input id="campusCode" placeholder="Ex: FUH" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Ex: Hoa Lac, Hanoi" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Ex: 0123456789" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Ex: contact@fpt.edu.vn" />
          </div>
        </div>
        <Button className="w-full mt-4">
          <CirclePlus />
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
}