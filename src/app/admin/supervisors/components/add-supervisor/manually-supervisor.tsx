"use client"

import { CirclePlus } from "lucide-react";

import { useApi } from "@/hooks/use-api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManuallySupervisor() {
    const { callApi } = useApi();

    const manuallySupervisorHandler = async () => {
        try {
            const data = await callApi('identity/Users/supervisors', { method: "POST" });
            console.log(data);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Supervisor</CardTitle>
                <CardDescription>
                    Fill in supervisor information as required below
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="studentCode">Supervisor code</Label>
                    <Input id="studentCode" placeholder="Ex: vulns" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input id="fullName" placeholder="Ex: Lê Nguyễn Sơn Vũ" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Ex: vulns@fe.edu.vn" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="majorCode">Major code</Label>
                    <Input id="majorCode" placeholder="Ex: SE" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <CirclePlus />
                    Add
                </Button>
            </CardFooter>
        </Card>
    )
}