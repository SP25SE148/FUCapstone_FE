"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";

import { LookupProp, Topic, useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context";

import { Badge } from "@/components/ui/badge";
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

const getStatus = (status: number | undefined) => {
    switch (status) {
        case 0:
            return (
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    Pending
                </Badge>
            );
        case 1:
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Passed
                </Badge>
            );
        case 2:
            return (
                <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    Considered
                </Badge>
            );
        case 3:
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                    Failed
                </Badge>
            );
        default:
            return null;
    }
}

const getCreatedDate = (data: string | undefined) => {
    const date = new Date(data || "");
    // Chuyển sang giờ Việt Nam (GMT+7)
    const vnDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

    const day = vnDate.getDate().toString().padStart(2, '0');
    const month = (vnDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = vnDate.getFullYear();

    const hours = vnDate.getHours().toString().padStart(2, '0');
    const minutes = vnDate.getMinutes().toString().padStart(2, '0');
    const seconds = vnDate.getSeconds().toString().padStart(2, '0');

    return (
        <div className="flex items-center gap-2">
            <span>{`${day}/${month}/${year}`}</span>
            <span className="text-muted-foreground">{`${hours}:${minutes}:${seconds}`}</span>
        </div>
    )
};

export default function LookupTopicPage() {
    const router = useRouter();
    const { lookupTopics, businessAreas, fetchCampusList, fetchSemesterList, fetchCapstoneList, lookupTopic } = useSupervisorTopic();

    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [campusList, setCampusList] = useState<[]>([]);
    const [semesterList, setSemesterList] = useState<[]>([]);
    const [capstoneList, setCapstoneList] = useState<[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(lookupTopics?.currentPage || 1);

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

    // pagination handle
    const handleNextPage = () => {
        if (pageNumber < lookupTopics?.totalNumberOfPages) {
            setPageNumber((prev: number) => prev + 1);
        }
    };
    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prev: number) => prev - 1);
        }
    };

    useEffect(() => {
        (async () => {
            const [campuses, semesters, capstones] = await Promise.all([
                fetchCampusList(),
                fetchSemesterList(),
                fetchCapstoneList(),
            ]);
            setCampusList(campuses);
            setSemesterList(semesters);
            setCapstoneList(capstones);
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
                    <Filter />
                    Filter
                </Button>
            </div>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {open && <Card className="p-4 space-y-2">
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
                                                    {businessAreas?.map((businessArea: any, index: number) => (
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
                                                    <SelectItem value={"1"}><strong>Passed</strong></SelectItem>
                                                    <SelectItem value={"2"}><strong>Considered</strong></SelectItem>
                                                    <SelectItem value={"3"}><strong>Failed</strong></SelectItem>
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
                            <div className="flex justify-end">
                                <Button type="submit">
                                    <Search />
                                    Search
                                </Button>
                            </div>

                        </Card>}
                        <div className="space-y-4">
                            {lookupTopics?.items?.map((topic: Topic, index: number) => (
                                <Card
                                    key={index}
                                    className="p-4 grid grid-cols-4 items-center cursor-pointer hover:bg-muted"
                                    onClick={() => {
                                        router.push(`/supervisor/topics/${topic?.id}`)
                                    }}
                                >
                                    <span className="font-semibold text-primary">{topic?.code}</span>
                                    <div className="col-span-2">
                                        <p className="font-semibold tracking-tight text-xl text-primary">{topic?.englishName} - {topic?.abbreviation}</p>
                                        <p className="text-sm text-muted-foreground">{topic?.vietnameseName}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {getStatus(topic?.status)}
                                        <div className="flex gap-2 text-sm text-muted-foreground">
                                            <span>Created at:</span> {getCreatedDate(topic?.createdDate)}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        {lookupTopics?.items?.length > 0 && <div className="flex items-center justify-center gap-2">
                            <Button
                                size={"icon"}
                                onClick={pageNumber > 1 ? handlePreviousPage : (e) => e.preventDefault()}
                                className={`cursor-pointer ${pageNumber === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
                                <ChevronLeft />
                            </Button>
                            <div>
                                {lookupTopics?.currentPage} / {lookupTopics?.totalNumberOfPages}
                            </div>
                            <div>
                                Total: {lookupTopics?.totalNumberOfItems}
                            </div>
                            <Button
                                size={"icon"}
                                onClick={pageNumber < lookupTopics?.totalNumberOfPages ? handleNextPage : (e) => e.preventDefault()}
                                className={`cursor-pointer ${pageNumber === lookupTopics?.totalNumberOfPages ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <ChevronRight />
                            </Button>
                        </div>}
                    </form>
                </Form >
            </CardContent >
        </Card >
    )
}