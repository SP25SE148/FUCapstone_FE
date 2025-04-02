"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CirclePlus, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Capstone } from "@/types/types";
import { useAdminManager } from "@/contexts/admin/admin-manager-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    email: z.string()
        .email("Invalid email.")
        .max(50, "Email must not exceed 50 characters."),
    fullName: z.string()
        .min(2, "Full name must have at least 2 characters.")
        .max(50, "Full name must not exceed 50 characters."),
    capstoneId: z.string()
        .min(3, "Please select a capstone."),
});

export default function ManuallyManager({ onClose }: { onClose: () => void }) {
    const { addManager, fetchCapstoneList } = useAdminManager();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [capstoneList, setCapstoneList] = useState<Capstone[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            capstoneId: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const res: any = await addManager(values);
            if (res?.isSuccess) {
                form.reset();
                onClose();
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async function getCapstones() {
            const capstones: Capstone[] = await fetchCapstoneList();
            setCapstoneList(capstones)
        })();
    }, [])

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
                                        <Input placeholder="Ex: anv@fe.edu.vn" {...field} disabled={isLoading} />
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
                                    <FormLabel>User name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Nguyễn Văn A" {...field} disabled={isLoading} />
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a capstone" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {capstoneList?.map((capstone: Capstone, index) => (
                                                <SelectItem key={index} value={capstone?.id}><strong>{capstone?.id}</strong> - <span className="text-muted-foreground text-xs">{capstone?.name}</span></SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <CirclePlus />
                                    Add
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
