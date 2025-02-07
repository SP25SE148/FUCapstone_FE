import { CirclePlus } from "lucide-react"

import ImportManager from "./import-manager"
import ManuallyManager from "./manually-manager"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

export default function AddManager() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-6">
                    <CirclePlus />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new manager</DialogTitle>
                    <DialogDescription>
                        This action can be done manually or by importing a file.
                    </DialogDescription>
                    <Tabs defaultValue="manually" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="manually">Manually</TabsTrigger>
                            <TabsTrigger value="import">Import</TabsTrigger>
                        </TabsList>
                        <TabsContent value="manually">
                            <ManuallyManager />
                        </TabsContent>
                        <TabsContent value="import">
                            <ImportManager />
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}