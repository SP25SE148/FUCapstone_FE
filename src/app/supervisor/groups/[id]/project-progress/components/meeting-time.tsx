"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ClockIcon, SquarePen } from "lucide-react";

import { ProjectProgress } from "@/types/types";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

const formSchema = z.object({
    meetingDate: z.string({
        required_error: "Please select a meeting date.",
    }),
    slot: z.string({
        required_error: "Please select a slot.",
    }),
});

export default function MeetingTime({ projectProgress }: { projectProgress: ProjectProgress }) {
    const { updateProjectProgress } = useSupervisorGroup();
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            meetingDate: projectProgress?.meetingDate || "",
            slot: projectProgress?.slot || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const data = {
            Id: projectProgress?.id,
            MeetingDate: values?.meetingDate,
            Slot: values?.slot
        }
        try {
            const res: any = await updateProjectProgress(data);
            if (res?.isSuccess) {
                form.reset();
                setOpen(false);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        form.reset({
            meetingDate: projectProgress?.meetingDate || "",
            slot: projectProgress?.slot || "",
        });
    }, [projectProgress, form.reset]);

    return (
        <>
            <Card className="sticky top-0 z-10 border-none shadow-md bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
                <CardContent className="p-2 flex items-center justify-between gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="size-4" />
                            <span className="font-medium flex items-center gap-2">
                                Meeting date:
                                <Badge
                                    variant="outline"
                                    className="font-semibold bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
                                >
                                    {projectProgress?.meetingDate || "Not scheduled"}
                                </Badge>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="size-4" />
                            <span className="font-medium flex items-center gap-2">
                                Slot:
                                <Badge
                                    variant="outline"
                                    className="font-semibold bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
                                >
                                    {projectProgress?.slot || "Not assigned"}
                                </Badge>
                            </span>
                        </div>
                    </div>
                    <Button size="icon" variant="outline" className="text-foreground" onClick={() => setOpen(true)}>
                        <SquarePen />
                    </Button>
                </CardContent>
            </Card>

            {/* Dialog (Modal) */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Meeting Time</DialogTitle>
                        <DialogDescription>Update meeting time information for group.</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="meetingDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meeting date</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a meeting date." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Monday">Monday</SelectItem>
                                                <SelectItem value="Tuesday">Tuesday</SelectItem>
                                                <SelectItem value="Wednesday">Wednesday</SelectItem>
                                                <SelectItem value="Thursday">Thursday</SelectItem>
                                                <SelectItem value="Friday">Friday</SelectItem>
                                                <SelectItem value="Saturday">Saturday</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slot"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slot</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a slot" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Slot1">Slot1</SelectItem>
                                                <SelectItem value="Slot2">Slot2</SelectItem>
                                                <SelectItem value="Slot3">Slot3</SelectItem>
                                                <SelectItem value="Slot4">Slot4</SelectItem>
                                                <SelectItem value="Slot5">Slot5</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>Save</Button>
                                <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                                    Cancel
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
