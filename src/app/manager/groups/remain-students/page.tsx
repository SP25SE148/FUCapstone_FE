"use client"

import { useState } from "react";
import { Dices, Loader2 } from "lucide-react";

import { useManagerGroup } from "@/contexts/manager/manager-group-context";

import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RemainStudentsPage() {
    const { remainStudentList, mergeRemainStudentsIntoGroup } = useManagerGroup();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRandomGroup = async () => {
        setIsLoading(true);
        try {
            await mergeRemainStudentsIntoGroup();
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="min-h-[calc(100vh-96px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Remain Students</CardTitle>
                    <CardDescription>Remain students and information.</CardDescription>
                </CardHeader>
                <Button className="mr-6" onClick={handleRandomGroup} disabled={isLoading || remainStudentList?.length <= 0}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Dices />}
                    {isLoading ? "Please wait ..." : "Random Group"}
                </Button>
            </div>
            <CardContent>
                <DataTable columns={columns} data={remainStudentList || []} />
            </CardContent>
        </Card>
    )
}