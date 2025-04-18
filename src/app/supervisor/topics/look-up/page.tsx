"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, FileX, Filter, Search, Trash2 } from "lucide-react";

import { LookupProp, Topic } from "@/types/types";
import { useSupervisorTopicLookup } from "@/contexts/supervisor/supervisor-topic-lookup-context";

import ItemTopic from "./components/item-topic";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    searchTerm: z.string()
        .max(50, "Search term must not exceed 50 characters.")
        .optional(),
    campusId: z.string()
        .optional(),
    semesterId: z.string()
        .optional(),
    capstoneId: z.string()
        .optional(),
    businessAreaId: z.string()
        .optional(),
    difficultyLevel: z.string()
        .optional(),
    status: z.string()
        .optional(),
    mainSupervisorEmail: z.string()
        .email("Invalid supervisor email.")
        .optional()
        .or(z.literal('')),
});

export default function LookupTopicPage() {
    const { lookupList, campusList, semesterList, capstoneList, businessAreaList, lookupTopic } = useSupervisorTopicLookup();

    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(lookupList?.currentPage || 1);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchTerm: "",
            campusId: "",
            semesterId: "",
            capstoneId: "",
            businessAreaId: "",
            difficultyLevel: "",
            status: "",
            mainSupervisorEmail: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setPageNumber(1);
        const data: LookupProp = {
            searchTerm: values?.searchTerm || "",
            campusId: values?.campusId || "all",
            semesterId: values?.semesterId || "all",
            capstoneId: values?.capstoneId || "all",
            businessAreaId: values?.businessAreaId || "all",
            difficultyLevel: values?.difficultyLevel || "all",
            status: values?.status || "all",
            mainSupervisorEmail: values?.mainSupervisorEmail || "all",
            pageNumber: "1"
        }
        setIsLoading(true);
        try {
            const res: any = await lookupTopic(data);
            if (res?.isSuccess) {
                setOpen(false)
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleReset = () => {
        form.reset()
        const data: LookupProp = {
            searchTerm: "",
            campusId: "all",
            semesterId: "all",
            capstoneId: "all",
            businessAreaId: "all",
            difficultyLevel: "all",
            status: "all",
            mainSupervisorEmail: "all",
            pageNumber: "1"
        };
        lookupTopic(data);
        setOpen(false);
    }

    // pagination handle
    const handleNextPage = () => {
        if (pageNumber < lookupList?.totalNumberOfPages) {
            setPageNumber((prev: number) => prev + 1);
        }
    };
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prev: number) => prev - 1);
        }
    };

    const isFormEmpty = Object.values(form.getValues()).every(value => !value);

    useEffect(() => {
        const values = form.getValues()
        const data: LookupProp = {
            searchTerm: values?.searchTerm || "",
            campusId: values?.campusId || "all",
            semesterId: values?.semesterId || "all",
            capstoneId: values?.capstoneId || "all",
            businessAreaId: values?.businessAreaId || "all",
            difficultyLevel: values?.difficultyLevel || "all",
            status: values?.status || "all",
            mainSupervisorEmail: values?.mainSupervisorEmail || "all",
            pageNumber: String(pageNumber)
        };
        lookupTopic(data);
    }, [pageNumber]);

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Look up</CardTitle>
                    <CardDescription>Look up information about topics</CardDescription>
                </CardHeader>
                <div className="relative">
                    <Button className="mr-6" onClick={() => setOpen(!open)}>
                        <Filter />
                        Filter
                    </Button>
                    {open && <Card className="absolute w-[calc(100vw-132px)] top-12 right-6 z-10 p-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="searchTerm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="What are you looking for?" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    <FormField
                                        control={form.control}
                                        name="campusId"
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
                                                            <SelectValue placeholder="Campus" />
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
                                        name="semesterId"
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
                                                            <SelectValue placeholder="Semester" />
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
                                    <FormField
                                        control={form.control}
                                        name="capstoneId"
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
                                                            <SelectValue placeholder="Capstone" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {capstoneList?.map((capstone: any, index: number) => (
                                                            <SelectItem key={index} value={capstone?.id}><strong>{capstone?.id}</strong> - <span className="text-muted-foreground text-xs">{capstone?.name}</span></SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="businessAreaId"
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
                                                            <SelectValue placeholder="Business Area" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {businessAreaList?.map((businessArea: any, index: number) => (
                                                            <SelectItem key={index} value={businessArea?.id}><strong>{businessArea?.name}</strong></SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="difficultyLevel"
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
                                                            <SelectValue placeholder="Difficulty Level" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={"0"}><strong>Easy</strong></SelectItem>
                                                        <SelectItem value={"1"}><strong>Medium</strong></SelectItem>
                                                        <SelectItem value={"2"}><strong>Hard</strong></SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
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
                                                            <SelectValue placeholder="Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={"0"}><strong>Pending</strong></SelectItem>
                                                        <SelectItem value={"1"}><strong>Approved</strong></SelectItem>
                                                        <SelectItem value={"2"}><strong>Considered</strong></SelectItem>
                                                        <SelectItem value={"3"}><strong>Rejected</strong></SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="mainSupervisorEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter email of supervisor to find topic of them." {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button type="reset" onClick={handleReset} variant={"outline"}>
                                        <Trash2 />
                                        Clear
                                    </Button>
                                    <Button type="submit">
                                        <Search />
                                        Search
                                    </Button>
                                </div>
                            </form>
                        </Form >
                    </Card>}
                </div>
            </div>
            {isFormEmpty && lookupList?.items?.length <= 0
                ?
                <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
                    <div className="h-full flex flex-col items-center justify-center gap-8">
                        <FileX className="size-20 text-primary" />
                        <div className="space-y-2">
                            <p className="text-xl font-bold text-center text-primary">
                                No topics yet.
                            </p>
                            <p className="text-muted-foreground text-center text-sm">
                                Please try again later.
                            </p>
                        </div>
                    </div>
                </CardContent>
                :
                <>
                    {lookupList?.items?.length <= 0 ?
                        <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
                            <div className="h-full flex flex-col items-center justify-center gap-8">
                                <FileX className="size-20 text-primary" />
                                <div className="space-y-2">
                                    <p className="text-xl font-bold text-center text-primary">
                                        We couldn't find any topics that match your request.
                                    </p>
                                    <p className="text-muted-foreground text-center text-sm">
                                        Please try again with another criteria.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        :
                        <CardContent className="space-y-8">
                            {/* list topic */}
                            <div className="space-y-4">
                                {lookupList?.items?.map((topic: Topic, index: number) => (
                                    <ItemTopic key={index} topic={topic} />
                                ))}
                            </div>

                            {/* phân trang */}
                            {lookupList?.items?.length > 0 && <div className="flex items-center justify-center gap-2">
                                <Button
                                    size={"icon"}
                                    onClick={pageNumber > 1 ? handlePreviousPage : (e) => e.preventDefault()}
                                    className={`cursor-pointer ${pageNumber === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
                                    <ChevronLeft />
                                </Button>
                                <div>
                                    {lookupList?.currentPage} / {lookupList?.totalNumberOfPages}
                                </div>
                                <div>
                                    Total: {lookupList?.totalNumberOfItems}
                                </div>
                                <Button
                                    size={"icon"}
                                    onClick={pageNumber < lookupList?.totalNumberOfPages ? handleNextPage : (e) => e.preventDefault()}
                                    className={`cursor-pointer ${pageNumber === lookupList?.totalNumberOfPages ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <ChevronRight />
                                </Button>
                            </div>}
                        </CardContent >}
                </>}
        </Card >
    )
}