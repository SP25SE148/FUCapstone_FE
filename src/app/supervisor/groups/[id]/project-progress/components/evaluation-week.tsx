import { useState } from "react";
import { ChartColumn } from "lucide-react";
import { Button } from "@/components/ui/button";
import EvaluationSheet from "./evaluation-sheet";

export default function EvaluationWeek({ data, refresh }: { data: any, refresh: () => void }) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Button
                size={"sm"}
                onClick={() => setOpen(true)}
            >
                <ChartColumn />
                Evaluation
            </Button>
            <EvaluationSheet open={open} onClose={() => setOpen(false)} data={data} refresh={refresh} />
        </>
    )
}