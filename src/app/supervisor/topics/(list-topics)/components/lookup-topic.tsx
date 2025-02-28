"use client"

import { Input } from "@/components/ui/input";
import { useState } from "react";


export default function LookupTopic() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="space-y-4">
            <h3 className="text-center" onClick={() => setOpen(!open)}>Look up information about topics</h3>
            {open && <div >

                <Input placeholder="What are you looking for?" />
                <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="Campus" />
                    <Input placeholder="Semester" />
                    <Input placeholder="Capstone" />
                    <Input placeholder="Business Area" />
                    <Input placeholder="Difficulty" />
                    <Input placeholder="Status" />
                </div>
                <Input placeholder="Supervisor" />
            </div>}

            <div className="h-[500px] bg-muted"></div>
        </div >
    )
}