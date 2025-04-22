"use client"

import { Info } from "lucide-react";

import { useAdminConfig } from "@/contexts/admin/admin-config-context";

import { columns } from "./columns";
import { CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

export default function TimeConfigTable() {
    const { timeConfigs } = useAdminConfig()

    return (
        <CardContent className="p-6 space-y-8">
            <div className="p-4 rounded-lg border border-primary/90 flex items-center gap-4">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1.5">
                    <h4 className="font-semibold text-primary">Time Configurations Notes</h4>
                    <p className="text-sm text-primary">Changes to these settings will affect behavior across the entire <strong>CAMPUS</strong>.</p>
                    <p className="text-sm text-muted-foreground">Please make sure you understand the implications before making changes.</p>
                </div>
            </div>
            <DataTable columns={columns} data={timeConfigs || []} />
        </CardContent>
    )
}