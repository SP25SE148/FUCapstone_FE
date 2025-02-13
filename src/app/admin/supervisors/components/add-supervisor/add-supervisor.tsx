"use client"

import { useState } from "react"
import { CirclePlus } from "lucide-react"

import ImportSupervisor from "./import-supervisor"
import ManuallySupervisor from "./manually-supervisor"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

export default function AddSupervisor() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="m-6">
                    <CirclePlus />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new supervisor</DialogTitle>
                    <DialogDescription>
                        This action can be done manually or by importing a file.
                    </DialogDescription>
                    <Tabs defaultValue="manually" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="manually">Manually</TabsTrigger>
                            <TabsTrigger value="import">Import</TabsTrigger>
                        </TabsList>
                        <TabsContent value="manually">
                            <ManuallySupervisor onClose={() => setOpen(false)} />
                        </TabsContent>
                        <TabsContent value="import">
                            <ImportSupervisor onClose={() => setOpen(false)} />
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}