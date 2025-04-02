"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CirclePlus, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Capstone, Major } from "@/types/types";
import { useAdminStudent } from "@/contexts/admin/admin-student-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
    studentCode: z.string()
        .min(5, "Student code must be at least 5 characters.")
        .max(8, "Student code must not exceed 8 characters"),
    fullName: z.string()
        .min(2, "Full name must have at least 2 characters.")
        .max(50, "Full name must not exceed 50 characters."),
    email: z.string()
        .email("Invalid email.")
        .max(50, "Email must not exceed 50 characters."),
    majorId: z.string()
        .min(2, "Please select a major."),
    capstoneId: z.string()
        .min(3, "Please select a capstone."),
});

export default function ManuallyStudent({ onClose }: { onClose: () => void }) {
    const { addStudent, fetchMajorList, fetchCapstoneListByMajor } = useAdminStudent();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [majorList, setMajorList] = useState<Major[]>([]);
    const [capstoneList, setCapstoneList] = useState<Capstone[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studentCode: "",
            fullName: "",
            email: "",
            majorId: "",
            capstoneId: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const res: any = await addStudent(values);
            if (res?.isSuccess) {
                form.reset();
                onClose();
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function getCapstonesByMajor(value: string) {
        const capstones: any = await fetchCapstoneListByMajor(value);
        setCapstoneList(capstones)
    }

    useEffect(() => {
        (async function getMajors() {
            const majors: Major[] = await fetchMajorList();
            setMajorList(majors)
        })();
    }, [])

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
                                        <Input placeholder="Ex: SE173512" {...field} disabled={isLoading} />
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
                                        <Input placeholder="Ex: Nguyễn Đức Thắng" {...field} disabled={isLoading} />
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
                                        <Input placeholder="Ex: thangndse173512@fpt.edu.vn" {...field} disabled={isLoading} />
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
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            getCapstonesByMajor(value)
                                        }}
                                        defaultValue={field.value}
                                        disabled={isLoading}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a major" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {majorList?.map((major: Major, index) => (
                                                <SelectItem key={index} value={major?.id}><strong>{major?.id}</strong> - <span className="text-muted-foreground text-xs">{major?.name}</span></SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={capstoneList.length == 0 || isLoading}>
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