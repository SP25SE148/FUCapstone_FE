"use client"

import { z } from "zod"
import * as XLSX from "xlsx";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Download, Loader2, Upload } from "lucide-react"

// import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useManagerDefense } from "@/contexts/manager/manager-defense-context";

const formSchema = z.object({
    file: z
        .any()
        .refine((files) => files?.length === 1, "Please select a file.")
        .refine((files) => { 
            const allowedType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // MIME type của Excel
            return files && files[0]?.type === allowedType;
        }, "Only accept Excel files (.xlsx)"),
});

export default function UploadDefenseCalendar({ refresh }: { refresh?: any }) {
    const params = useParams();
    const id: string = String(params.id);
    const { importDefenseCalendar, getDefensesCalendarTemplate } = useManagerDefense();

    const [open, setOpen] = useState<boolean>(false);
    const [fileData, setFileData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openPreview, setOpenPreview] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const file = values.file[0]; 
            const formData = new FormData();
            formData.append("GroupId", id)
            formData.append("File", file);
            const res: any = await importDefenseCalendar(formData);
            if (res?.isSuccess) {
                form.reset();
                setOpen(false);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet); // Chuyển sheet thành JSON
                setFileData(jsonData);
            };
            reader.readAsArrayBuffer(file);
        }
        setOpenPreview(true);
    };

    async function handleDownload() {
        const url = await getDefensesCalendarTemplate();
        if (!url) return;
        const a = document.createElement("a");
        a.href = url;
        a.download = "Template_Import_Defense_Calendar"; // Đặt tên file khi tải về
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="mr-6">
                        <Upload />
                        Upload
                    </Button>
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Upload Defense Calendar</DialogTitle>
                        <DialogDescription>
                            Download template and upload defense calendar for capstone.
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
                                            <Input
                                                type="file"
                                                accept=".xlsx"
                                                disabled={isLoading}
                                                onChange={(e) => {
                                                    field.onChange(e.target.files);
                                                    handleFileChange(e);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant={"outline"} type="button" disabled={isLoading} onClick={handleDownload}>
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

            <Dialog open={openPreview} onOpenChange={() => { setOpenPreview(false) }}>
                <DialogContent className="max-w-4xl w-full">
                    <DialogHeader>
                        <DialogTitle>Preview</DialogTitle>
                        <DialogDescription>
                            Review to check the contents of the file before confirming.
                        </DialogDescription>
                    </DialogHeader>
                    {fileData.length > 0 && (
                        <div className="w-full h-[540px] overflow-scroll">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {Object.keys(fileData[0]).map((key) => (
                                            <TableHead key={key} className="min-w-[200px]">{key}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fileData.map((row, index) => (
                                        <TableRow key={index}>
                                            {Object.values(row).map((cell, i) => (
                                                <TableCell key={i} className="align-top">{cell as string}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}