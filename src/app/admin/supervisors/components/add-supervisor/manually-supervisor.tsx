"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CirclePlus, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminSupervisor } from "@/contexts/admin/admin-supervisor-context";
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
    majorId: z.string()
        .min(2, "Please select a major."),
});

export default function ManuallySupervisor({ onClose }: { onClose: () => void }) {
    const [majorList, setMajorList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { addSupervisor, fetchMajorList } = useAdminSupervisor();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            majorId: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const res: any = await addSupervisor(values);
            if (res?.isSuccess) {
                form.reset();
                onClose();
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async function getMajors() {
            const majors: any = await fetchMajorList();
            setMajorList(majors)
        })();
    }, [])

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
                                        <Input placeholder="Ex: vulns@fpt.edu.vn" {...field} disabled={isLoading} />
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
                                        <Input placeholder="Ex: Lê Nguyễn Sơn Vũ" {...field} disabled={isLoading} />
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a major" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {majorList?.map((major: any, index) => (
                                                <SelectItem key={index} value={major?.id}><strong>{major?.id}</strong> - <span className="text-muted-foreground text-xs">{major?.name}</span></SelectItem>
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
    )
}