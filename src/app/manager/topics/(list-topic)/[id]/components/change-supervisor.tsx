import { useEffect, useState } from "react";
import { PlusCircle, Replace, User2 } from "lucide-react";

import { Supervisor, Topic } from "@/types/types";
import { useManagerTopics } from "@/contexts/manager/manager-topic-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

export default function ChangeSupervisor({ topic }: { topic: Topic }) {
    const { supervisors, fetchSupervisorList, assignNewSupervisorForTopic, addNewCoSupervisorForTopicByManager, } = useManagerTopics();

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredSupervisors = supervisors?.filter(supervisor =>
        supervisor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supervisor.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangeMain = async (supervisorId: string) => {
        setLoading(true); // Toàn bộ modal bị vô hiệu hóa
        try {
            await assignNewSupervisorForTopic({
                TopicId: topic?.id,
                SupervisorId: supervisorId
            });
            setOpen(false); // Đóng modal sau khi thêm thành công
        } finally {
            setLoading(false);
        }
    };

    const handleAddCosupervisor = async (supervisorId: string) => {
        setLoading(true); // Toàn bộ modal bị vô hiệu hóa
        try {
            await addNewCoSupervisorForTopicByManager({
                TopicId: topic?.id,
                SupervisorId: supervisorId
            });
            setOpen(false); // Đóng modal sau khi thêm thành công
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchSupervisorList();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={!loading ? setOpen : undefined}>
            <DialogTrigger asChild>
                <Button size={"sm"} onClick={() => setOpen(!open)}>
                    <Replace />
                    Supervisor
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[680px]" aria-disabled={loading}>
                <DialogHeader>
                    <DialogTitle>Edit Supervisor</DialogTitle>
                    <DialogDescription>
                        Change supervisor or add cosupervisors of topic.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Search by ID or Email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                    disabled={loading}
                />
                <div className="h-[500px] space-y-2 overflow-y-auto">
                    {filteredSupervisors?.map((supervisor: Supervisor) => (
                        <Card key={supervisor.id} className="bg-primary/5">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-12 border-2 border-primary">
                                        <AvatarFallback className="bg-primary/10">
                                            <User2 className="size-6 text-primary" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-primary">{supervisor?.fullName} - {supervisor?.id}</p>
                                        <p className="text-sm text-muted-foreground">{supervisor?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={"outline"}
                                        size={"sm"}
                                        onClick={() => handleChangeMain(supervisor.id)}
                                        disabled={loading}
                                    >
                                        <Replace />
                                        Main
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        onClick={() => handleAddCosupervisor(supervisor.id)}
                                        disabled={loading}
                                    >
                                        <PlusCircle />
                                        Cosupervisor
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}