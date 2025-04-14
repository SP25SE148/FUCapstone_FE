"use client"

import type React from "react"

import { Download } from "lucide-react"


import { Button } from "@/components/ui/button"
import { useSupervisorDefense } from "@/contexts/supervisor/supervisor-defense-context"

export default function DownloadDocument({groupId}: { groupId: string }) {
    const { getPresignUrlOfGroupDocument } = useSupervisorDefense()

    async function handleDownload() {
        if (groupId) {
            const url = await getPresignUrlOfGroupDocument(groupId);
            if (!url) return;
            const a = document.createElement("a");
            a.href = url;
            a.download = `Group_Documents_${groupId}`; // Đặt tên file khi tải về
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    return (
        <Button type="button" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download
        </Button>
    )
}

