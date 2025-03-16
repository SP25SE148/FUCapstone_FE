import Link from "next/link";
import { Card } from "@/components/ui/card";
import { FileCheck} from "lucide-react";


export default function NoTopic() {
 return (
        <>
            <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
                <div className="flex flex-col items-center justify-center gap-8">
                    <FileCheck className="size-20 text-primary" />
                    <div className="space-y-2">
                        <p className="text-2xl font-bold text-center">
                        Your group has not registered a Topic or the registered Topic has not been approved
                        </p>
                        <p className="text-muted-foreground text-center">
                            Please check the <Link href={"/student/topics"} className="text-primary hover:underline hover:underline-offset-2">Topics</Link>
                        </p>
                    </div>
                </div>
            </Card>
        </>
    )
}