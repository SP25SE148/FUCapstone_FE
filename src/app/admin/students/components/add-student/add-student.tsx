import { CirclePlus } from "lucide-react"

import ImportStudent from "./import-student"
import ManuallyStudent from "./manually-student"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

export default function AddStudent() {
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
                    <DialogTitle>Add new students</DialogTitle>
                    <DialogDescription>
                        This action can be done manually or by importing a file.
                    </DialogDescription>
                    <Tabs defaultValue="manually" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="manually">Manually</TabsTrigger>
                            <TabsTrigger value="import">Import</TabsTrigger>
                        </TabsList>
                        <TabsContent value="manually">
                            <ManuallyStudent />
                        </TabsContent>
                        <TabsContent value="import">
                            <ImportStudent />
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}