"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, MessageCircleMore, RefreshCw, Scale, Send, XCircle } from "lucide-react";

import { Decision, Member } from "@/types/types";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    comment: z
        .string()
        .min(10, {
            message: "Comment must be at least 10 characters.",
        })
        .max(160, {
            message: "Comment must not be longer than 30 characters.",
        })
        .optional(),
    decision: z.enum(["1", "2", "3"], {
        errorMap: () => ({ message: "Please select decision" }),
    }),
});

export default function MyDecisionPage() {
    const { getGroupDecisionResponse, updateGroupDecisionStatusBySupervisor, getTopicGroupInformation } = useSupervisorGroup()
    const params = useParams();
    const groupId: string = String(params.id);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [makeDecision, setMakeDecision] = useState<boolean>(false);
    const [decision, setDecision] = useState<Decision>();
    const [disagreeMember, setDisagreeMember] = useState<string[]>([]);
    const [groupMemberList, setGroupMemberList] = useState<Member[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            decision: "1"
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const data = {
                "groupId": groupId,
                "DecisionStatus": Number(values?.decision),
                "Comment": values?.comment || null,
                "DisagreedToDefenseStudentIds": disagreeMember || null
            }
            const res: any = await updateGroupDecisionStatusBySupervisor(data);
            if (res?.isSuccess) {
                form.reset();
            }
        } finally {
            setIsLoading(false);
        }
    }

    const toggleDisagreeStatus = (id: string) => {
        setDisagreeMember(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        (async () => {
            const decisionDetail = await getGroupDecisionResponse(groupId);
            setDecision(decisionDetail)
        })();
    }, [])

    useEffect(() => {
        (async () => {
            const groupFullInfo = await getTopicGroupInformation(groupId);
            setGroupMemberList(groupFullInfo?.groupMemberList)
        })();
    }, [])

    useEffect(() => {
        if (form.getValues("decision") === "3") {
            setDisagreeMember([]);
        }
    }, [form.watch("decision")]); // Theo dõi giá trị decision

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">My Decision</CardTitle>
                <CardDescription>My decision for group defense</CardDescription>
            </CardHeader>
            {decision
                ?
                <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] flex items-center justify-center">
                    <Card className="w-full max-w-md shadow-lg bg-primary/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-center">Decision Record</CardTitle>
                            <CardDescription className="text-center">Defense agreement details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-2 py-2 border-b">
                                <span className="text-sm font-medium text-muted-foreground">Group ID:</span>
                                <span className="col-span-2 text-sm font-mono">{decision.groupId}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-2 border-b">
                                <span className="text-sm font-medium text-muted-foreground">Group Code:</span>
                                <span className="col-span-2 text-sm font-semibold">{decision.groupCode}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-2 border-b">
                                <span className="text-sm font-medium text-muted-foreground">Decision:</span>
                                <div className="col-span-2">
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                        {decision.decision.replace(/_/g, " ")}
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-2">
                                <span className="text-sm font-medium text-muted-foreground">Comment:</span>
                                <span className="col-span-2 text-sm italic text-muted-foreground">
                                    {decision.comment || "No comment provided"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
                :
                <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
                    {!makeDecision
                        ?
                        <div className="h-full flex flex-col items-center justify-center gap-8">
                            <Scale className="size-20 text-primary" />
                            <div className="space-y-2">
                                <p className="text-xl font-bold text-center">
                                    No decision have been made yet.
                                </p>
                                <p className="text-muted-foreground text-center text-sm">
                                    Please take a decision for group at right time.
                                </p>
                            </div>
                            <Button
                                className="transition-all hover:scale-105"
                                onClick={() => setMakeDecision(true)}
                            >
                                <Scale />
                                MAKE DECISION
                            </Button>
                        </div>
                        :
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <h3 className="font-semibold flex items-center gap-2">
                                                <MessageCircleMore className="size-4 text-primary" />
                                                Comment:
                                            </h3>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Type your comment here ... "
                                                    className="resize-y"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="decision"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <h3 className="font-semibold flex items-center gap-2">
                                                <Scale className="size-4 text-primary" />
                                                Decision:
                                            </h3>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="1" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            <CheckCircle2 className="size-4 text-green-500" />
                                                            Agree to defense
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="2" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            <RefreshCw className="size-4 text-amber-500" />
                                                            Revised for the 2 defense
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="3" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            <XCircle className="size-4 text-red-500" />
                                                            Disagree to defense
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <XCircle className="size-4 text-primary" />
                                        Select "Disagree to defense" students:
                                    </h3>
                                    <Table className="border min-w-max select-none">
                                        <TableHeader className="bg-primary hover:bg-primary">
                                            <TableRow className="hover:bg-primary">
                                                <TableHead className="py-2 h-fit text-background">#</TableHead>
                                                <TableHead className="py-2 h-fit text-background">Student Code</TableHead>
                                                <TableHead className="py-2 h-fit text-background">Student Name</TableHead>
                                                <TableHead className="py-2 h-fit text-background text-center">Disagree to defense</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {groupMemberList.map((student: Member, index: number) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{student.studentId}</TableCell>
                                                    <TableCell>{student.studentFullName}</TableCell>
                                                    <TableCell className="text-center">
                                                        {form.watch("decision") === "3" ? ( // Sử dụng watch để theo dõi thay đổi ngay lập tức
                                                            <div className="w-6 h-6 mx-auto rounded-md flex items-center justify-center bg-red-100 border border-red-500 text-red-700">
                                                                x
                                                            </div>
                                                        ) : (
                                                            <Checkbox
                                                                id={`disagree-${student.studentId}`}
                                                                checked={!!disagreeMember?.find(x => x === student.studentId)}
                                                                onCheckedChange={() => toggleDisagreeStatus(student.studentId)}
                                                                className="data-[state=checked]:bg-red-500 data-[state=checked]:text-white"
                                                            />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex items-center justify-end">
                                    <Button type="submit">
                                        {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                                        Send
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    }
                </CardContent>
            }
        </Card >
    )
}