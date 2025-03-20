import UploadDocument from "./components/upload-document";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentPage() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Group Document</CardTitle>
                    <CardDescription>All group document information.</CardDescription>
                </CardHeader>
                <UploadDocument />
            </div>
            <CardContent>
            </CardContent>
        </Card>
    )
}