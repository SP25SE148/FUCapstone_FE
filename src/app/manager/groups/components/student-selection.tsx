import { useState } from "react";
import { Plus, User2 } from "lucide-react";

import { Student } from "@/types/types";
import { useManagerGroup } from "@/contexts/manager/manager-group-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Props {
    groupId: string;
    open: boolean;
    setOpen: () => void;
}

export default function StudentSelection({ groupId, open, setOpen }: Props) {
    const { remainStudentList, assignRemainStudentForGroup } = useManagerGroup();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleAddStudent = async (studentId: string) => {
        setLoading(true); // Toàn bộ modal bị vô hiệu hóa
        try {
            await assignRemainStudentForGroup({
                GroupId: groupId,
                StudentId: studentId
            });
            // setOpen(); // Đóng modal sau khi thêm thành công
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = remainStudentList?.filter(student =>
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={!loading ? setOpen : undefined}>
            <DialogContent className="max-w-[600px]" aria-disabled={loading}>
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                    <DialogDescription>Add member to group manually.</DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Search by ID or Email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                    disabled={loading}
                />
                <div className="h-[500px] space-y-2 overflow-y-auto">
                    {filteredStudents?.map((student: Student) => (
                        <Card key={student.id} className="bg-primary/5">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-12 border-2 border-primary">
                                        <AvatarFallback className="bg-primary/10">
                                            <User2 className="size-6 text-primary" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-primary">{student?.fullName} - {student?.id} - GPA: {student?.gpa}</p>
                                        <p className="text-sm text-muted-foreground">{student?.email}</p>
                                    </div>
                                </div>
                                <Button
                                    size={"icon"}
                                    onClick={() => handleAddStudent(student.id)}
                                    disabled={loading}
                                >
                                    <Plus />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
} 