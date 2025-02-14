"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/contexts/student-context";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    studentCode: z.string()
        .min(2, "Mã sinh viên phải có ít nhất 2 ký tự")
        .max(20, "Mã sinh viên không được quá 20 ký tự"),
    fullName: z.string()
        .min(2, "Tên người dùng phải có ít nhất 2 ký tự")
        .max(50, "Tên người dùng không được quá 50 ký tự"),
    email: z.string()
        .email("Email không hợp lệ")
        .max(100, "Email không được quá 100 ký tự"),
    majorId: z.string()
        .min(2, "Mã ngành phải có ít nhất 2 ký tự"),
    capstoneId: z.string()
        .min(2, "Mã đồ án phải có ít nhất 2 ký tự"),
});

export default function ManuallyStudent({ onClose }: { onClose: () => void }) {
    const { addStudent } = useStudent();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentCode: "",
            fullName: "",
            email: "",
            majorId: "",
            capstoneId: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res: any = await addStudent(values);
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
                        <CardTitle>Student</CardTitle>
                        <CardDescription>
                            Fill in student information as required below
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="studentCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Student code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: SE173512" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Nguyễn Đức Thắng" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: thangndse173512@fpt.edu.vn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="majorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Major</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: SE" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="capstoneId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Capstone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: SEP490" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">
                            <CirclePlus />
                            Add
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}