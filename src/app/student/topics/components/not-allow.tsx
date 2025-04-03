import Link from "next/link";
import { Users } from "lucide-react";

import { Card } from "@/components/ui/card";

export default function NotAllow() {
    return (
        <Card className="min-h-[calc(100vh-16px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
            <div className="flex flex-col items-center justify-center gap-8">
                <Users className="size-20 text-primary" />
                <div className="space-y-2">
                    <p className="text-2xl font-bold text-center text-primary">
                        You are not currently in any groups or your group still pending.
                    </p>
                    <p className="text-muted-foreground text-center">
                        Please check the <Link href={"/student/groups/my-request"} className="text-primary font-semibold hover:underline hover:underline-offset-2">My Request</Link> section or wait for the group leader to register your group.
                    </p>
                </div>
            </div>
        </Card>
    )
}