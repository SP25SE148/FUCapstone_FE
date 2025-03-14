import { Button } from "@/components/ui/button";
import EvaluationSheet from "./evaluation-sheet";
import { useState } from "react";

export default function EvaluationWeek({ data }: { data: any }) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <Button size={"sm"} onClick={() => setOpen(true)}>Evaluation</Button>
            <EvaluationSheet open={open} onClose={() => setOpen(false)} data={data} />
        </>
    ) 
}