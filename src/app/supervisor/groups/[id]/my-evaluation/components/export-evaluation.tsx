import { saveAs } from "file-saver";
import { FileDown } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

export default function ExportEvaluation() {
    const { exportEvaluationWeeklyProgressFile } = useSupervisorGroup();

    const params = useParams();
    const id: string = String(params.id);

    const handleExport = async () => {
        const res = await exportEvaluationWeeklyProgressFile(id);
        const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "Evaluation_Project_Progress.xlsx");
    }

    return (
        <Button className="m-6" onClick={handleExport}>
            <FileDown />
            Export
        </Button>
    )
}