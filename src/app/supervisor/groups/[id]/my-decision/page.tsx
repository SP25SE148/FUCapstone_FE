"use client"

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { Loader2, Scale, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    decision: z.enum(["1", "2"], {
        errorMap: () => ({ message: "Please select decision" }),
    }),
});

export default function MyDecisionPage() {
    const { updateGroupDecisionStatusBySupervisor } = useSupervisorGroup()
    const params = useParams();
    const groupId: string = String(params.id);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const data = {
                "groupId": groupId,
                "DecisionStatus": Number(values?.decision),
            }
            const res: any = await updateGroupDecisionStatusBySupervisor(data);
            if (res?.isSuccess) {
                form.reset();
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">My Decision</CardTitle>
                <CardDescription>My decision for group defense</CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
                <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Scale className="size-4 text-primary" />
                        Decision:
                    </h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="decision"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select decision" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={"1"}>Attempt1</SelectItem>
                                                <SelectItem value={"2"}>Attempt2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-end">
                                <Button type="submit">
                                    {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                                    Send
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card >
    )
}