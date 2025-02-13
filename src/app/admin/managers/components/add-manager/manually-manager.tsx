"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useManager } from "@/contexts/manager-context";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    email: z.string()
        .email("Email không hợp lệ")
        .max(100, "Email không được quá 100 ký tự"),
    userName: z.string()
        .min(2, "Tên người dùng phải có ít nhất 2 ký tự")
        .max(50, "Tên người dùng không được quá 50 ký tự"),
    campusId: z.string()
        .min(2, "Mã cơ sở phải có ít nhất 2 ký tự"),
});

export default function ManuallyManager({ onClose }: { onClose: () => void }) {
    const { addManager } = useManager();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            userName: "",
            campusId: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res: any = await addManager(values);
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
                        <CardTitle>Manager</CardTitle>
                        <CardDescription>
                            Fill in manager information as required below
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: vulns@fe.edu.vn" {...field} />
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
                                    <FormLabel>User name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Lê Nguyễn Sơn Vũ" {...field} />
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
                                    <FormLabel>Campus Id</FormLabel>
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