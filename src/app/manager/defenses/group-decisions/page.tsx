"use client"

import { useState } from "react";
import { FileDown, Search } from "lucide-react";

import { Decision } from "@/types/types";
import { useManagerDefense } from "@/contexts/manager/manager-defense-context";

import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

export default function GroupDecisionsPage() {
    const { getGroupDecisionByManager } = useManagerDefense();
    const [decision, setDecision] = useState<string>("1");
    const [groupDecisionsList, setGroupDecisionsList] = useState<Decision[]>([]);

    async function getGroupDecisions() {
        const groupDecisions = await getGroupDecisionByManager(decision);
        setGroupDecisionsList(groupDecisions);
    };

    return (
        <Card className="min-h-[calc(100vh-96px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">
                        Group Decisions
                    </CardTitle>
                    <CardDescription>Information about group decisions and export to file.</CardDescription>
                </CardHeader>
                <Button className="mr-6" disabled={groupDecisionsList?.length <= 0}>
                    <FileDown className="h-4 w-4" />
                    Export
                </Button>
            </div>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Select onValueChange={(value) => setDecision(value)} defaultValue="1">
                        <SelectTrigger className="w-[320px]" >
                            <SelectValue placeholder="Decision" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Agree to defense</SelectItem>
                            <SelectItem value="2">Revised for the second defense</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={getGroupDecisions}
                    >
                        <Search />
                        Results
                    </Button>
                </div>
                <DataTable columns={columns} data={groupDecisionsList || []} />
            </CardContent>
        </Card>
    )
}