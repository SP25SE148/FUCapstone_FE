"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Upload, Download } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/contexts/student-context";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Schema kiểm tra file upload (chỉ chấp nhận .xlsx)
const formSchema = z.object({
    file: z
        .any()
        .refine((files) => files?.length === 1, "Vui lòng chọn một file.")
        .refine((files) => {
            const allowedType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // MIME type của Excel
            return files && files[0]?.type === allowedType;
        }, "Chỉ chấp nhận file Excel (.xlsx)"),
});

export default function ImportStudent({ onClose }: { onClose: () => void }) {
    const { importStudent } = useStudent();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const file = values.file[0]; // Lấy file đầu tiên
        const formData = new FormData();
        formData.append("file", file);
        const res: any = await importStudent(formData);
        if (res?.isSuccess) {
            form.reset();
            onClose();
        }
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Import List Student</CardTitle>
                        <CardDescription>Tải xuống mẫu và tải lên danh sách sinh viên</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File Excel</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept=".xlsx" onChange={(e) => field.onChange(e.target.files)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="grid w-full grid-cols-2 gap-4">
                        <Button variant={"outline"} type="button">
                            <Download />
                            Download template
                        </Button>
                        <Button type="submit">
                            <Upload />
                            Upload
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
