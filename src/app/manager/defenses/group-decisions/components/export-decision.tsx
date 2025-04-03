import { saveAs } from "file-saver";
import { FileDown } from "lucide-react";

import { Decision } from "@/types/types";
import { useManagerDefense } from "@/contexts/manager/manager-defense-context";

import { Button } from "@/components/ui/button";

export default function ExportDecision({ decision, groupDecisionsList }: { decision: string, groupDecisionsList: Decision[] }) {
    const { exportGroupDecisionByStatus } = useManagerDefense();

    const handleExport = async () => {
        const res = await exportGroupDecisionByStatus(decision);
        const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "Group_Decision.xlsx");
    }

    return (
        <Button className="mr-6" disabled={groupDecisionsList?.length <= 0} onClick={handleExport}>
            <FileDown className="h-4 w-4" />
            Export
        </Button>
    )
}