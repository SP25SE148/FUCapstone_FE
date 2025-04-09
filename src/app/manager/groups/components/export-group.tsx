import { saveAs } from "file-saver";
import { FileDown } from "lucide-react";

import { GroupFullInfo } from "@/types/types";
import { useManagerGroup } from "@/contexts/manager/manager-group-context";

import { Button } from "@/components/ui/button";

export default function ExportGroup({ groupList }: { groupList: GroupFullInfo[] }) {
    const { exportGroup } = useManagerGroup();

    const handleExport = async () => {
        const res = await exportGroup();
        const blob = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, "List_Group.xlsx");
    }

    return (
        <Button className="mr-6" disabled={groupList?.length <= 0} onClick={handleExport}>
            <FileDown className="h-4 w-4" />
            Export
        </Button>
    )
}