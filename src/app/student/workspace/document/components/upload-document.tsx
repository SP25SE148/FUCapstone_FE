"use client"

import type React from "react"

import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Loader2, Upload, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

import { useStudentTasks } from "@/contexts/student/student-task-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

const formSchema = z.object({
    file: z
        .instanceof(FileList)
        .refine((files) => files.length === 1, "Please select a file.")
        .refine((files) => {
            const file = files[0]
            const fileName = file.name.toLowerCase()
            return fileName.endsWith(".zip") || fileName.endsWith(".rar")
        }, "Only compressed files (.zip, .rar) are accepted"),
})

export default function UploadDocument({ refresh }: { refresh?: () => void }) {
    const { groupInfo, uploadGroupDocument } = useStudentTasks()

    const [open, setOpen] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const file = values.file[0]
            const formData = new FormData()
            formData.append("GroupId", groupInfo?.id || "")
            formData.append("File", file)

            const res: any = await uploadGroupDocument(formData)

            if (res?.isSuccess) {
                form.reset()
                setFileName("")
                setOpen(false)
                if (refresh) refresh()
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files?.length) {
            setFileName(files[0].name)
            form.setValue("file", files as unknown as FileList, {
                shouldValidate: true,
            })
        } else {
            setFileName("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="m-6">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Group Document</DialogTitle>
                    <DialogDescription>Upload a compressed folder (.zip, .rar) containing the required files.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field: { onChange, value, ...rest } }) => (
                                <FormItem>
                                    <FormLabel>Compressed File (.zip, .rar)</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="file"
                                                    accept=".zip,.rar"
                                                    disabled={isLoading}
                                                    onChange={handleFileChange}
                                                    className="cursor-pointer"
                                                    {...rest}
                                                />
                                            </div>
                                            {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                type="button"
                                disabled={isLoading}
                                onClick={() => {
                                    setOpen(false)
                                    form.reset()
                                    setFileName("")
                                }}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

