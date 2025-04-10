import { useState } from "react";
import { CirclePlus } from "lucide-react";

import ImportAdmin from "@/app/superadmin/admins/component/add-admin/import-admin";
import ManuallyAdmin from "@/app/superadmin/admins/component/add-admin/manually-admin";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AddAdmin() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="m-6">
          <CirclePlus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add new admins</DialogTitle>
          <DialogDescription>
            This action can be done manually or by importing a file.
          </DialogDescription>
          <Tabs defaultValue="manually" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manually">Manually</TabsTrigger>
              <TabsTrigger value="import">Import</TabsTrigger>
            </TabsList>
            <TabsContent value="manually">
              <ManuallyAdmin setOpen={setOpen} />
            </TabsContent>
            <TabsContent value="import">
              <ImportAdmin />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}