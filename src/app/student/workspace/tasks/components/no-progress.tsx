import Link from "next/link";
import { FileX } from "lucide-react";

import { Card } from "@/components/ui/card";

export default function NoProgress() {
    return (
        <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
            <div className="flex flex-col items-center justify-center gap-8">
                <FileX className="size-20 text-primary" />
                <div className="space-y-2">
                    <p className="text-2xl font-bold text-center text-primary">
                    Your team has not been added to the Progress Week from your Supervisor
                    </p>
                    <p className="text-muted-foreground text-center">
                        Please check your <Link href={"/student/workspace"} className="text-primary font-semibold hover:underline hover:underline-offset-2">Progress Week</Link>
                    </p>
                </div>
            </div>
        </Card>
    )
}