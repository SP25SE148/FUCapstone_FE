import { UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Home() {
    return (
        <Card className="min-h-[calc(100vh-16px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
            <div className="flex flex-col items-center justify-center gap-8">
                <UserCheck className="size-20 text-primary" />
                <div className="space-y-2">
                    <p className="text-2xl font-bold text-center text-primary">
                        Welcome to FUC
                    </p>
                    <p className="text-muted-foreground text-center">
                        FPT University Capstone Management System
                    </p>
                </div>
            </div>
        </Card>
    )
}