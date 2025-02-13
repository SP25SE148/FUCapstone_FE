"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"

import { useApi } from "@/hooks/use-api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStudent } from "@/contexts/student-context";

const formSchema = z.object({
    studentCode: z.string()
        .min(2, "Mã sinh viên phải có ít nhất 2 ký tự")
        .max(20, "Mã sinh viên không được quá 20 ký tự"),
    email: z.string()
        .email("Email không hợp lệ")
        .max(100, "Email không được quá 100 ký tự"),
    userName: z.string()
        .min(2, "Tên người dùng phải có ít nhất 2 ký tự")
        .max(50, "Tên người dùng không được quá 50 ký tự"),
    majorId: z.string()
        .min(2, "Mã ngành phải có ít nhất 2 ký tự"),
    capstoneId: z.string()
        .min(2, "Mã đồ án phải có ít nhất 2 ký tự"),
    campusId: z.string()
        .min(2, "Mã cơ sở phải có ít nhất 2 ký tự"),
});

export default function ManuallyStudent() {
    const { addStudent } = useStudent();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentCode: "",
            email: "",
            userName: "",
            majorId: "",
            capstoneId: "",
            campusId: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values);
        await addStudent(values);
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
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Nguyễn Đức Thắng" {...field} />
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
                        <FormField
                            control={form.control}
                            name="campusId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Campus</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: HCM" {...field} />
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