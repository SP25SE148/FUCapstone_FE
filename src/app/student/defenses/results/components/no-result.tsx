import { ShieldClose } from "lucide-react";
import { CardContent } from "@/components/ui/card";

export default function NoResult() {
    return (
        <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
            <div className="h-full flex flex-col items-center justify-center gap-8">
                <ShieldClose className="size-20 text-primary" />
                <div className="space-y-2">
                    <p className="text-xl font-bold text-center text-primary">
                        No defense results have been made yet.
                    </p>
                    <p className="text-muted-foreground text-center text-sm">
                        Defense results will be available after the defense is performed.
                    </p>
                </div>
            </div>
        </CardContent>
    )
}