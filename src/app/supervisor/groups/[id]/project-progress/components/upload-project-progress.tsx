"use client"

import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Download, Loader2, Upload } from "lucide-react"

import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

const formSchema = z.object({
    file: z
        .any()
        .refine((files) => files?.length === 1, "Please select a file.")
        .refine((files) => {
            const allowedType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // MIME type của Excel
            return files && files[0]?.type === allowedType;
        }, "Only accept Excel files (.xlsx)"),
});

export default function UploadProjectProgress({ refresh }: { refresh: any }) {
    const params = useParams();
    const id: string = String(params.id);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { importProjectProgress } = useSupervisorGroup();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const file = values.file[0]; // Lấy file đầu tiên
            const formData = new FormData();
            formData.append("GroupId", id)
            formData.append("File", file);
            const res: any = await importProjectProgress(formData);
            if (res?.isSuccess) {
                form.reset();
                setOpen(false);
                refresh();
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="m-6">
                    <Upload />
                    Upload
                </Button>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Upload Project Progress</DialogTitle>
                    <DialogDescription>
                        Download template and upload project progress for group
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File Excel</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept=".xlsx" onChange={(e) => field.onChange(e.target.files)} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant={"outline"} type="button" disabled={isLoading}>
                                <Download />
                                Template
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload />
                                        Upload
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >

    )
}