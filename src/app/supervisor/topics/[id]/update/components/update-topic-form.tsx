"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Send, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Topic } from "@/types/types";
import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context";

import DownloadDocument from "../../components/download-document";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const formSchema = z.object({
    englishName: z.string().min(1, "English Name is required"),
    vietnameseName: z.string().min(1, "Vietnamese Name is required"),
    abbreviation: z.string().min(1, "Abbreviation is required"),
    description: z.string().min(1, "Description is required"),
    file: z
        .custom<FileList>((val) => val instanceof FileList, {
            message: "Invalid file input",
        })
        .refine((files) => files?.length === 1, {
            message: "Please select one file.",
        })
        .refine((files) => {
            const allowedTypes = [
                "application/msword", // .doc
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
            ];
            return allowedTypes.includes(files[0].type);
        }, {
            message: "Only accept Word (.doc, .docx) files.",
        }),
});

export default function UpdateTopicForm() {
    const router = useRouter();
    const params = useParams();
    const id: string = String(params.id);
    const { fetchTopicsById, updateTopic } = useSupervisorTopic();

    const [topic, setTopic] = useState<Topic>();
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            englishName: "",
            vietnameseName: "",
            abbreviation: "",
            description: "",
            file: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("EnglishName", values.englishName);
            formData.append("VietnameseName", values.vietnameseName);
            formData.append("Abbreviation", values.abbreviation);
            formData.append("Description", values.description);
            if (values.file) {
                const file = values.file[0]; // Lấy file đầu tiên
                formData.append("File", file);
            }
            const res: any = await updateTopic(topic?.id || "", formData);
            if (res?.isSuccess) {
                form.reset();
                router.back();
            }
        } finally {
            setIsLoading(false);
            setIsConfirmOpen(false);
        }
    }

    const handleConfirm = async () => {
        const isValid = await form.trigger();
        if (isValid) {
            setIsConfirmOpen(true);
        }
    };

    useEffect(() => {
        (async () => {
            const topicDetail = await fetchTopicsById(id);
            setTopic(topicDetail)
        })();
    }, [])

    useEffect(() => {
        if (topic) {
            form.reset({
                englishName: topic.englishName || "",
                vietnameseName: topic.vietnameseName || "",
                abbreviation: topic.abbreviation || "",
                description: topic.description || "",
                file: undefined, // Không thể pre-fill file input
            });
        }
    }, [topic, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Capstone <span className="text-red-500">*</span></Label>
                        <Input defaultValue={topic?.capstoneId} disabled />
                    </div>
                    <FormField
                        control={form.control}
                        name="englishName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>English Name <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="English Name..." {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="vietnameseName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Vietnamese Name <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="Vietnamese Name..." {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="abbreviation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Abbreviations <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="Abbreviations..." {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Type description for topic here..."
                                        className="resize-y"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2">
                        <Label>Difficulty Level <span className="text-red-500">*</span></Label>
                        <Input defaultValue={topic?.difficultyLevel} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label>Business Area <span className="text-red-500">*</span></Label>
                        <Input defaultValue={topic?.businessAreaName} disabled />
                    </div>
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>File <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input type="file" accept=".docx, .doc" onChange={(e) => field.onChange(e.target.files)} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter className="justify-between">
                    {topic && <DownloadDocument topic={topic} />}
                    <Button type="button" onClick={handleConfirm}>
                        <Send />
                        Update
                    </Button>
                </CardFooter>

                {/* confirm */}
                <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Registration</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to update this topic?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex items-center" onClick={() => { form.handleSubmit(onSubmit)() }} disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                                {isLoading ? "Sending" : "Confirm"}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </form>
        </Form>
    );
};