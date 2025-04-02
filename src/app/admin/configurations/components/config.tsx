"use client"

import { z } from "zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, FilePen, FileX, School, UserPlus, Users, UserX } from "lucide-react"

import { cn } from "@/lib/utils"
import { useAdminConfig } from "@/contexts/admin/admin-config-context"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"

const FormSchema = z.object({
    teamUpDate: z.date().optional(),
    teamUpExpirationDate: z.date().optional(),
    registTopicDate: z.date().optional(),
    registTopicExpiredDate: z.date().optional(),
    isActived: z.boolean().optional(),
});

export default function TimeConfigurationPage() {
    const { timeConfigs, updateTimeConfig } = useAdminConfig()
    const initialConfig = timeConfigs[0]
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        setIsLoading(true);
        const data = {
            "Id": initialConfig?.id,
            "TeamUpDate": values?.teamUpDate && format(values?.teamUpDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "TeamUpExpirationDate": values?.teamUpExpirationDate && format(values?.teamUpExpirationDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "RegistTopicDate": values?.registTopicDate && format(values?.registTopicDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "RegistTopicExpiredDate": values?.registTopicExpiredDate && format(values?.registTopicExpiredDate, "yyyy-MM-dd'T'HH:mm:ss"),
            "IsActived": values?.isActived
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
        if (initialConfig?.teamUpDate) {
            form.setValue("teamUpDate", new Date(initialConfig.teamUpDate));
            form.setValue("teamUpExpirationDate", new Date(initialConfig.teamUpExpirationDate));
            form.setValue("registTopicDate", new Date(initialConfig.registTopicDate));
            form.setValue("registTopicExpiredDate", new Date(initialConfig.registTopicExpiredDate));
            form.setValue("isActived", initialConfig.isActived);
        }
    }, [initialConfig, form.setValue]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                    <h3 className="font-semibold flex items-center gap-2">
                        <School className="size-4 text-primary" />
                        Campus: {initialConfig?.campusId}
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

                <Separator />

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
                                                Team Up Date
                                            </FormLabel>
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
                                                Team Up Expired Date
                                            </FormLabel>
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
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                        <FilePen className="size-4 text-primary" />
                        Register Topic Settings
                    </h3>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardContent className="p-4">
                                <FormField
                                    control={form.control}
                                    name="registTopicDate"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between -mt-2">
                                            <FormLabel className="mt-2 flex items-center gap-2">
                                                <FilePen className="size-4 text-muted-foreground" />
                                                Register Topic Date
                                            </FormLabel>
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
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <FormField
                                    control={form.control}
                                    name="registTopicExpiredDate"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between -mt-2">
                                            <FormLabel className="mt-2 flex items-center gap-2">
                                                <FileX className="size-4 text-muted-foreground" />
                                                Register Topic Expired Date
                                            </FormLabel>
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
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="col-span-2 flex items-end justify-end">
                    <Button type="submit" disabled={isLoading}>{isLoading ? "Updating ..." : "Update"}</Button>
                </div>
            </form>
        </Form>
    )
}