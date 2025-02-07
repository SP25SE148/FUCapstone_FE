"use client"

import { CirclePlus } from "lucide-react";

import { useApi } from "@/hooks/use-api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManuallyStudent() {
    const { callApi } = useApi();

    const manuallyStudentHandler = async () => {
        try {
            const data = await callApi('identity/Users/students', { method: "POST" });
            console.log(data);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student</CardTitle>
                <CardDescription>
                    Fill in student information as required below
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="studentCode">Student code</Label>
                    <Input id="studentCode" placeholder="Ex: SE173512" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input id="fullName" placeholder="Ex: Nguyễn Đức Thắng" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Ex: thangndse173512@fpt.edu.vn" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="majorCode">Major code</Label>
                    <Input id="majorCode" placeholder="Ex: SE" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="capstoneCode">Capstone code</Label>
                    <Input id="capstoneCode" placeholder="Ex: SEP490" />
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