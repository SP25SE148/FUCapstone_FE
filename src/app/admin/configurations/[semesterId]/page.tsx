"use client"

import { z } from "zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation";
import { BadgeInfo, BookText, Calendar1, CalendarCheck, CalendarIcon, FilePen, FileX, Loader2, Pencil, RefreshCw, RefreshCwOff, School, ShieldCheck, ShieldX, Undo2, UserPlus, Users, UserX } from "lucide-react"

import { cn } from "@/lib/utils"
import { TimeConfig } from "@/types/types";
import { useAdminConfig } from "@/contexts/admin/admin-config-context";

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"

const FormSchema = z.object({
    teamUpDate: z.date().optional(),
    teamUpExpirationDate: z.date().optional(),
    registTopicForSupervisorDate: z.date().optional(),
    registTopicForSupervisorExpiredDate: z.date().optional(),
    registTopicForGroupDate: z.date().optional(),
    registTopicForGroupExpiredDate: z.date().optional(),
    reviewAttemptDate: z.date().optional(),
    reviewAttemptExpiredDate: z.date().optional(),
    defendCapstoneProjectDate: z.date().optional(),
    defendCapstoneProjectExpiredDate: z.date().optional(),
    isActived: z.boolean().optional(),
});

export default function TimeConfigDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const semesterId: string = String(params.semesterId);

    const { getTimeConfigBySemesterId, updateTimeConfig } = useAdminConfig();

    const [isLoading, setIsLoading] = useState(false);
    const [timeConfig, setTimeConfig] = useState<TimeConfig>();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        const data = {
            "id": timeConfig?.id,
            "teamUpDate": values?.teamUpDate && format(values?.teamUpDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "teamUpExpirationDate": values?.teamUpExpirationDate && format(values?.teamUpExpirationDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "registTopicForSupervisorDate": values?.registTopicForSupervisorDate && format(values?.registTopicForSupervisorDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "registTopicForSupervisorExpiredDate": values?.registTopicForSupervisorExpiredDate && format(values?.registTopicForSupervisorExpiredDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "registTopicForGroupDate": values?.registTopicForGroupDate && format(values?.registTopicForGroupDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "registTopicForGroupExpiredDate": values?.registTopicForGroupExpiredDate && format(values?.registTopicForGroupExpiredDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "reviewAttemptDate": values?.reviewAttemptDate && format(values?.reviewAttemptDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "reviewAttemptExpiredDate": values?.reviewAttemptExpiredDate && format(values?.reviewAttemptExpiredDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "defendCapstoneProjectDate": values?.defendCapstoneProjectDate && format(values?.defendCapstoneProjectDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "defendCapstoneProjectExpiredDate": values?.defendCapstoneProjectExpiredDate && format(values?.defendCapstoneProjectExpiredDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "isActived": values?.isActived
        }
        try {
            const res: any = await updateTimeConfig(data);
            if (res?.isSuccess) {
                form.reset();
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            const timeConfigDetail = await getTimeConfigBySemesterId(semesterId);
            setTimeConfig(timeConfigDetail)
        })();
    }, [])

    useEffect(() => {
        if (timeConfig?.teamUpDate) {
            form.setValue("teamUpDate", new Date(timeConfig.teamUpDate));
            form.setValue("teamUpExpirationDate", new Date(timeConfig.teamUpExpirationDate));
            form.setValue("registTopicForSupervisorDate", new Date(timeConfig.registTopicForSupervisorDate));
            form.setValue("registTopicForSupervisorExpiredDate", new Date(timeConfig.registTopicForSupervisorExpiredDate));
            form.setValue("registTopicForGroupDate", new Date(timeConfig.registTopicForGroupDate));
            form.setValue("registTopicForGroupExpiredDate", new Date(timeConfig.registTopicForGroupExpiredDate));
            form.setValue("reviewAttemptDate", new Date(timeConfig.reviewAttemptDate));
            form.setValue("reviewAttemptExpiredDate", new Date(timeConfig.reviewAttemptExpiredDate));
            form.setValue("defendCapstoneProjectDate", new Date(timeConfig.defendCapstoneProjectDate));
            form.setValue("defendCapstoneProjectExpiredDate", new Date(timeConfig.defendCapstoneProjectExpiredDate));
            form.setValue("isActived", timeConfig.isActived);
        }
    }, [timeConfig, form.setValue]);

    return (
        <Card className="min-h-[calc(100vh-96px)] bg-gradient-to-tr from-primary/5 to-background">
            <div className="flex items-center bg-primary/10 rounded-t-xl">
                <Button className="ml-6" size={"icon"} variant={"outline"}
                    onClick={() => router.back()}
                >
                    <Undo2 />
                </Button>
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Time Configuration Details</CardTitle>
                    <CardDescription>All information of time configuration</CardDescription>
                </CardHeader>
            </div>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <BookText className="size-4 text-primary" />
                                General Information Settings
                            </h3>
                            <Card>
                                <CardContent className="p-6 space-y-2">
                                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-muted rounded-md p-2">
                                                <Calendar1 className="size-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-muted-foreground">
                                                    Semester Id
                                                </h3>
                                                <p className="font-semibold tracking-tight">{timeConfig?.semesterId}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-muted rounded-md p-2">
                                                <CalendarCheck className="size-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-muted-foreground">
                                                    Semester
                                                </h3>
                                                <p className="font-semibold tracking-tight">{timeConfig?.semesterName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-muted rounded-md p-2">
                                                <School className="size-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-muted-foreground">
                                                    Campus
                                                </h3>
                                                <p className="font-semibold tracking-tight">{timeConfig?.campusId}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-muted rounded-md p-2">
                                                <BadgeInfo className="size-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-muted-foreground">
                                                    Status
                                                </h3>
                                                <FormField
                                                    control={form.control}
                                                    name="isActived"
                                                    render={({ field }) => (
                                                        <FormItem className="flex items-center gap-2 -mt-2">
                                                            <FormLabel className="mt-2 w-[60px]">{form.getValues("isActived") ? "Active" : "Inactive"}</FormLabel>
                                                            <FormControl>
                                                                <Switch
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Separator />
                        {/* Team Up */}
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Users className="size-4 text-primary" />
                                Team Up Settings
                            </h3>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="teamUpDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <UserPlus className="size-4 text-muted-foreground" />
                                                        Start Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="teamUpExpirationDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <UserX className="size-4 text-muted-foreground" />
                                                        End Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <Separator />
                        {/* Register Topic For Supervisor */}
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <FilePen className="size-4 text-primary" />
                                Register Topic For Supervisor Settings
                            </h3>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="registTopicForSupervisorDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <FilePen className="size-4 text-muted-foreground" />
                                                        Start Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="registTopicForSupervisorExpiredDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <FileX className="size-4 text-muted-foreground" />
                                                        End Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <Separator />
                        {/* Register Topic For Group */}
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <FilePen className="size-4 text-primary" />
                                Register Topic For Group Settings
                            </h3>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="registTopicForGroupDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <FilePen className="size-4 text-muted-foreground" />
                                                        Start Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="registTopicForGroupExpiredDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <FileX className="size-4 text-muted-foreground" />
                                                        End Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <Separator />
                        {/* Review Attempt */}
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <RefreshCw className="size-4 text-primary" />
                                Review Attempt Settings
                            </h3>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="reviewAttemptDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <RefreshCw className="size-4 text-muted-foreground" />
                                                        Start Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="reviewAttemptExpiredDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <RefreshCwOff className="size-4 text-muted-foreground" />
                                                        End Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <Separator />
                        {/* Defend Capstone Project */}
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <ShieldCheck className="size-4 text-primary" />
                                Defend Capstone Project Settings
                            </h3>
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="defendCapstoneProjectDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <ShieldCheck className="size-4 text-muted-foreground" />
                                                        Start Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <FormField
                                            control={form.control}
                                            name="defendCapstoneProjectExpiredDate"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between -mt-2">
                                                    <FormLabel className="mt-2 flex items-center gap-2">
                                                        <ShieldX className="size-4 text-muted-foreground" />
                                                        End Date
                                                    </FormLabel>
                                                    <div className="space-y-2">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                        disabled={isLoading}
                                                                    >
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
                                                                    disabled={(date) => {
                                                                        const today = new Date();
                                                                        const oneYearAgo = new Date();
                                                                        oneYearAgo.setFullYear(today.getFullYear() - 1); // Ngày cách đây 1 năm
                                                                        const oneYearLater = new Date();
                                                                        oneYearLater.setFullYear(today.getFullYear() + 1); // Ngày 1 năm sau

                                                                        return date < oneYearAgo || date > oneYearLater;
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="col-span-2 flex items-end justify-end">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : <Pencil />}
                                {isLoading ? "Updating ..." : "Update"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}