import { CirclePlus, Download, Upload } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

export default function AddStudent() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-6">
                    <CirclePlus />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new students</DialogTitle>
                    <DialogDescription>
                        This action can be done manually or by importing a file.
                    </DialogDescription>
                    <Tabs defaultValue="manually" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="manually">Manually</TabsTrigger>
                            <TabsTrigger value="import">Import</TabsTrigger>
                        </TabsList>
                        <TabsContent value="manually">
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
                        </TabsContent>
                        <TabsContent value="import">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Import list student</CardTitle>
                                    <CardDescription>
                                        Download template and upload list
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="ffile">File</Label>
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
                        </TabsContent>
                    </Tabs>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}