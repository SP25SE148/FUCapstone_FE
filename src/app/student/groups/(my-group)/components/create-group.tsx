import Link from "next/link";
import { CirclePlus, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudentGroup } from "@/contexts/student/student-group-management";

export default function CreateGroup() {
    const { createGroup } = useStudentGroup();

    const handleCreateGroup = () => {
        createGroup();
    };

    return (
        <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
            <div className="flex flex-col items-center justify-center gap-8">
                <Users className="size-20 text-primary" />
                <div className="space-y-2">
                    <p className="text-2xl font-bold text-center">
                        You are not currently in any groups.
                    </p>
                    <p className="text-muted-foreground text-center">
                        Please check the <Link href={"/student/groups/my-request"} className="text-primary hover:underline hover:underline-offset-2">My Request</Link> section or create a group for yourself.
                    </p>
                </div>
                <Button
                    className="transition-all hover:scale-105"
                    onClick={handleCreateGroup}
                >
                    <CirclePlus />
                    CREATE GROUP
                </Button>
            </div>
        </Card>
    )
}