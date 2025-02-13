import { CirclePlus } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ManuallyAdmin from "@/app/superadmin/admins/component/add-admin/manually-admin";
import ImportAdmin from "@/app/superadmin/admins/component/add-admin/import-admin";

export default function AddAdmin() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-6">
          <CirclePlus />
          Add Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
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
              <ManuallyAdmin />
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