"use client"

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
export default function LookupTopicPage() {
    const [open, setOpen] = useState<boolean>(false);
    const [campusList, setCampusList] = useState<[]>([]);
    const [semesterList, setSemesterList] = useState<[]>([]);
    const { fetchCampusList, fetchSemesterList } = useSupervisorTopic();
    const [isLoading, setIsLoading] = useState(false);

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
        // setIsLoading(true);
        // try {
        //     const res: any = await addStudent(values);
        //     if (res?.isSuccess) {
        //         form.reset();
        //         onClose();
        //     }
        // } finally {
        //     setIsLoading(false);
        // }
    }

    useEffect(() => {
        (async () => {
            const [campuses, semesters] = await Promise.all([
                fetchCampusList(),
                fetchSemesterList()
            ]);
            setCampusList(campuses);
            setSemesterList(semesters);
        })();
    }, []);

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Look up</CardTitle>
                    <CardDescription>Look up information about topics</CardDescription>
                </CardHeader>
                <Button className="m-6" onClick={() => setOpen(!open)}>
                    {open ? <ChevronUp /> : <ChevronDown />}
                    Search
                </Button>
            </div>
            <CardContent>
                {open && <Card className="p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <Input placeholder="What are you looking for?" />
                            <div className="grid grid-cols-3 gap-2">
                                <FormField
                                    control={form.control}
                                    name="majorId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                defaultValue={field.value}
                                                disabled={isLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Campus" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {campusList?.map((campus: any, index: number) => (
                                                        <SelectItem key={index} value={campus?.id}><strong>{campus?.id}</strong> - <span className="text-muted-foreground text-xs">{campus?.name}</span></SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="majorId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                defaultValue={field.value}
                                                disabled={isLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Semester" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {semesterList?.map((semester: any, index: number) => (
                                                        <SelectItem key={index} value={semester?.id}><strong>{semester?.id}</strong> - <span className="text-muted-foreground text-xs">{semester?.name}</span></SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Input placeholder="Capstone" />
                                <Input placeholder="Business Area" />
                                <Input placeholder="Difficulty" />
                                <Input placeholder="Status" />
                            </div>
                            <Input placeholder="Supervisor" />
                            <div className="flex justify-end">
                                <Button className="">
                                    <Search />
                                    Search
                                </Button>
                            </div>
                        </form>
                    </Form>
                </Card>}
            </CardContent>

        </Card>
    )
}