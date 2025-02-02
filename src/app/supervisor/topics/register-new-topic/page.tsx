import { Download, Send } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

export default function RegisterNewTopicPage() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Register New Topic</CardTitle>
                <CardDescription>Fill in the required information to register a new topic</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="capstone">Capstone</Label>
                    <Input id="capstone" placeholder="Ex: SEP490" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="englishName">English Name</Label>
                    <Input id="englishName" placeholder="Ex: Capstone management system for FPT university teachers and students" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="vietnameseName">Vietnamese Name</Label>
                    <Input id="vietnameseName" placeholder="Ex: Hệ thống quản lý đồ án cho giảng viên và sinh viên của trường đại học FPT" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="abbreviations">Abbreviations</Label>
                    <Input id="abbreviations" placeholder="Ex: FUC" />
                </div>
                <div className="space-y-1 col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Type description for topic here." />
                </div>
                <div className="space-y-1 col-span-2">
                    <Label htmlFor="file">File</Label>
                    <Input id="file" type="file" />
                </div>
                <div className="space-y-1 col-span-2">
                    <Label htmlFor="supervisor2">Supervisor 2</Label>
                    <Input id="supervisor2" placeholder="Ex: SangNM" />
                </div>
            </CardContent>
            <CardFooter className="justify-between">
                <Button
                    variant={"outline"}
                    className="h-12 border-primary text-primary hover:bg-primary hover:text-white"
                >
                    <Download />
                    Template
                </Button>
                <Button
                    className="h-12"
                >
                    <Send />
                    Register
                </Button>
            </CardFooter>
        </Card>
    )
}