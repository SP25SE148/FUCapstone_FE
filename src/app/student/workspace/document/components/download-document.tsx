"use client"

import type React from "react"

import { Download } from "lucide-react"

import { useStudentTasks } from "@/contexts/student/student-task-context"

import { Button } from "@/components/ui/button"

export default function DownloadDocument() {
    const { groupInfo, getPresignUrlOfGroupDocument } = useStudentTasks()

    async function handleDownload() {
        if (groupInfo?.id) {
            const url = await getPresignUrlOfGroupDocument(groupInfo?.id);
            if (!url) return;
            const a = document.createElement("a");
            a.href = url;
            a.download = "Template_Import_Student"; // Đặt tên file khi tải về
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

