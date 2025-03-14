"use client";

import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { GroupTopicInfo, Member, useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";

interface GroupInfoSheetProps {
    data: any;
    open: boolean;
    onClose: () => void;
    refresh: () => void;
}

interface EvaluationData {
    studentId: string;
    contributionPercentage: number;
    comments: string;
    status: number | null;
}

export default function EvaluationSheet({ data, open, onClose, refresh }: GroupInfoSheetProps) {
    const { getTopicGroupInformation, evaluationWeeklyProgress } = useSupervisorGroup();
    const params = useParams();
    const id: string = String(params.id);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [evaluations, setEvaluations] = useState<EvaluationData[]>([]);
    const [errors, setErrors] = useState<{ [key: number]: boolean }>({});
    const [groupTopicInfo, setGroupTopicInfo] = useState<GroupTopicInfo>();
    const leaderInfo = groupTopicInfo?.groupMemberList?.find((x: Member) => x.isLeader);
    const memberList = groupTopicInfo?.groupMemberList?.filter((x: Member) => !x.isLeader);
    const orderedMembers = leaderInfo ? [leaderInfo, ...(memberList || [])] : memberList || [];

    useEffect(() => {
        (async () => {
            const groupTopicDetail = await getTopicGroupInformation(id);
            setGroupTopicInfo(groupTopicDetail);

            if (groupTopicDetail?.groupMemberList) {
                const initialEvaluations = groupTopicDetail.groupMemberList.map((member: Member) => ({
                    studentId: member.studentId,
                    contributionPercentage: 0,
                    comments: "",
                    status: null, // Chưa chọn
                }));
                setEvaluations(initialEvaluations);
            }
        })();
    }, []);

    const handleInputChange = (index: number, field: keyof EvaluationData, value: string | number | null) => {
        setEvaluations((prev) =>
            prev.map((evalData, i) => (i === index ? { ...evalData, [field]: value } : evalData))
        );

        // Xóa lỗi nếu người dùng đã chọn status
        if (field === "status" && value !== null) {
            setErrors((prev) => ({ ...prev, [index]: false }));
        }
    };

    const handleSubmit = () => {
        const newErrors: { [key: number]: boolean } = {};
        let hasError = false;

        evaluations.forEach((evalData, index) => {
            if (evalData.status === null) {
                newErrors[index] = true;
                hasError = true;
            }
        });

        setErrors(newErrors);

        if (!hasError) {
            setOpenConfirm(true)
        }
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const body = {
                "projectProgressId": data?.projectProgressId,
                "projectProgressWeekId": data?.currentProjectProgressWeek?.id,
                "evaluationRequestForStudents": evaluations
            }
            const res: any = await evaluationWeeklyProgress(body);
            if (res?.isSuccess) {
                refresh()
                setOpenConfirm(false);
                onClose();
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Sheet open={open} onOpenChange={onClose}>
                <SheetContent className="w-2/3 sm:max-w-2/3 overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="font-semibold tracking-tight text-xl text-primary">
                            Evaluation Week {data?.currentProjectProgressWeek?.weekNumber}
                        </SheetTitle>
                        <SheetDescription>Supervisor evaluates the group weekly.</SheetDescription>
                    </SheetHeader>
                    <Table className="border">
                        <TableHeader className="bg-primary hover:bg-primary">
                            <TableRow className="grid grid-cols-5 hover:bg-primary">
                                <TableHead className="py-2 h-fit text-center text-background">Student</TableHead>
                                <TableHead className="py-2 h-fit text-center text-background">Contribution</TableHead>
                                <TableHead className="py-2 h-fit text-center text-background">Status</TableHead>
                                <TableHead className="py-2 h-fit col-span-2 text-center text-background">Comments</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderedMembers?.map((member: Member, index: number) => (
                                <TableRow key={index} className="grid grid-cols-5">
                                    <TableCell className="font-medium">{member.studentFullName}</TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            max={100}
                                            min={0}
                                            value={evaluations[index]?.contributionPercentage}
                                            onChange={(e) => {
                                                const value = e.target.value === "" ? 0 : Math.max(0, parseFloat(e.target.value));
                                                handleInputChange(index, "contributionPercentage", value);
                                            }}
                                            onBlur={(e) => {
                                                if (e.target.value === "") {
                                                    handleInputChange(index, "contributionPercentage", 0);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            onValueChange={(value) => handleInputChange(index, "status", parseInt(value))}
                                        >
                                            <SelectTrigger className={errors[index] ? "border-red-500" : ""}>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Low</SelectItem>
                                                <SelectItem value="1">Good</SelectItem>
                                                <SelectItem value="2">Stable</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors[index] && <p className="text-red-500 text-sm mt-1">Please select status</p>}
                                    </TableCell>
                                    <TableCell className="col-span-2">
                                        <Textarea
                                            value={evaluations[index]?.comments}
                                            onChange={(e) => handleInputChange(index, "comments", e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <SheetFooter className="mt-6">
                        <Button type="submit" onClick={handleSubmit}>
                            <Send className="mr-2" />
                            Submit
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

            {/* confirm */}
            <AlertDialog open={openConfirm} onOpenChange={() => setOpenConfirm(false)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Please check again before confirm.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={isLoading} onClick={handleConfirm}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    );
}