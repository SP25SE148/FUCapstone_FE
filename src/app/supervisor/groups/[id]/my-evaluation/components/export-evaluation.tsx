import { FileDown } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

export default function ExportEvaluation() {
    const { exportEvaluationWeeklyProgressFile } = useSupervisorGroup();

    const params = useParams();
    const id: string = String(params.id);

    const handleExport = async () => {
        await exportEvaluationWeeklyProgressFile(id)
    }

    return (
        <Button className="m-6" onClick={handleExport}>
            <FileDown />
            Export
        </Button>
    )
}