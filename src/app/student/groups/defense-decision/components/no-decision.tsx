import { Scale } from "lucide-react";

import { CardContent } from "@/components/ui/card";

export default function NoDecision() {
    return (
        <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
            <div className="h-full flex flex-col items-center justify-center gap-8">
                <Scale className="size-20 text-primary" />
                <div className="space-y-2">
                    <p className="text-xl font-bold text-center text-primary">
                        No decision have been made yet.
                    </p>
                    <p className="text-muted-foreground text-center text-sm">
                        Please wait supervisor make decision for your group.
                    </p>
                </div>
            </div>
        </CardContent>
    )
}