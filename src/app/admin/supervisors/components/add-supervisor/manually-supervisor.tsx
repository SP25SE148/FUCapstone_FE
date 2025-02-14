"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSupervisor } from "@/contexts/supervisor-context";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    email: z.string()
        .email("Email không hợp lệ")
        .max(100, "Email không được quá 100 ký tự"),
    fullName: z.string()
        .min(2, "Tên người dùng phải có ít nhất 2 ký tự")
        .max(50, "Tên người dùng không được quá 50 ký tự"),
    majorId: z.string()
        .min(2, "Mã ngành phải có ít nhất 2 ký tự"),
});

export default function ManuallySupervisor({ onClose }: { onClose: () => void }) {
    const { addSupervisor } = useSupervisor();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            majorId: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res: any = await addSupervisor(values);
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
                        <CardTitle>Supervisor</CardTitle>
                        <CardDescription>
                            Fill in supervisor information as required below
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
                                        <Input placeholder="Ex: vulns@fpt.edu.vn" {...field} />
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
                                        <Input placeholder="Ex: Lê Nguyễn Sơn Vũ" {...field} />
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
                                    <FormLabel>Major Id</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: SE" {...field} />
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