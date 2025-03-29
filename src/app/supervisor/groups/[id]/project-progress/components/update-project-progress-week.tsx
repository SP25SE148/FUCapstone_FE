import { z } from "zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProjectProgressWeek } from "@/types/types";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"

interface UpdateProjectProgressWeekProps {
    projectProgressId: string,
    currentProjectProgressWeek: ProjectProgressWeek,
    refresh: () => void
    onClose: () => void
}

const formSchema = z.object({
    meetingLocation: z.string()
        .max(50, "Meeting location must not exceed 50 characters")
        .optional(),
    meetingContent: z.string()
        .max(500, "Meeting content must not exceed 500 characters.")
        .optional(),
    taskDescription: z.string()
        .min(1, "Task description is required")
        .max(500, "Task description must not exceed 500 characters."),
});

export default function UpdateProjectProgressWeek({ projectProgressId, currentProjectProgressWeek, refresh, onClose }: UpdateProjectProgressWeekProps) {
    const { updateProjectProgressWeek } = useSupervisorGroup();

    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            meetingLocation: "",
            meetingContent: "",
            taskDescription: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const data = {
            ProjectProgressId: projectProgressId,
            ProjectProgressWeekId: currentProjectProgressWeek?.id,
            TaskDescription: values?.taskDescription,
            MeetingLocation: values?.meetingLocation,
            MeetingContent: values?.meetingContent
        }
        try {
            const res: any = await updateProjectProgressWeek(data);
            if (res?.isSuccess) {
                form.reset();
                onClose();
                refresh();
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleConfirm = async () => {
        const isValid = await form.trigger();
        if (isValid) {
            setIsConfirmOpen(true);
        }
    };

    useEffect(() => {
        if (currentProjectProgressWeek) {
            form.reset({
                meetingLocation: currentProjectProgressWeek.meetingLocation || "",
                meetingContent: currentProjectProgressWeek.meetingContent || "",
                taskDescription: currentProjectProgressWeek.taskDescription || "",
            });
        }
    }, [currentProjectProgressWeek, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="meetingLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meeting location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Room 620 NVH" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="meetingContent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meeting content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type meeting content here..."
                                            className="h-[100px] max-h-[100px] resize-none overflow-y-scroll"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taskDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type task description for topic here..."
                                            className="h-[140px] max-h-[140px] resize-none overflow-y-scroll"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end gap-2">
                            <Button type="reset" variant={"outline"} size={"sm"} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="button" size={"sm"} onClick={handleConfirm} >
                                <Pencil />
                                Edit
                            </Button>
                        </div>
                    </div>
                </form>
            </Form >

            {/* Confirm */}
            < AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Please check again before continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsConfirmOpen(false)} disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            type="submit"
                            className="flex items-center"
                            onClick={() => { form.handleSubmit(onSubmit)() }}
                            disabled={isLoading}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    );
}