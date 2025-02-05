"use client"

import { Download, Upload } from "lucide-react";

import { useApi } from "@/hooks/use-api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImportStudent() {
    const { callApi } = useApi();

    const importStudentHandler = async () => {
        try {
            const data = await callApi('identity/Users/import/students', { method: "POST" });
            console.log(data);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Import list student</CardTitle>
                <CardDescription>
                    Download template and upload list
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="file">File</Label>
                    <Input id="file" type="file" />
                </div>
            </CardContent>
            <CardFooter className="grid w-full grid-cols-2 gap-4">
                <Button variant={"outline"}>
                    <Download />
                    Download template
                </Button>
                <Button>
                    <Upload />
                    Upload
                </Button>
            </CardFooter>
        </Card>
    )
}