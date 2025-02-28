"use client";

import { useState } from "react";
import { FileText, Download, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSuperadminTemplate } from "@/contexts/superadmin/superadmin-template-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function ItemFile({ file }: { file: any }) {
    const { getPresignedUrlTemplateDocument } = useSuperadminTemplate();

    const [open, setOpen] = useState<boolean>(false);
    const [urlPreview, setUrlPreview] = useState<string>("");

    async function handleClickPreview() {
        const url = await getPresignedUrlTemplateDocument(file.id);
        setUrlPreview(url);
        setOpen(true);
    }

    async function handleDownload() {
        if (!urlPreview) return;
        const a = document.createElement("a");
        a.href = urlPreview;
        a.download = file.name; // Đặt tên file khi tải về
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <>
            {/* Nút mở xem trước */}
            <p
                className="flex items-center gap-2 text-blue-400 text-sm cursor-pointer hover:underline"
                onClick={handleClickPreview}
            >
                <FileText className="size-4" />
                {file.name}
            </p>

            {/* Modal xem trước */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl w-full">
                    <DialogHeader>
                        <DialogTitle>Preview</DialogTitle>
                    </DialogHeader>
                    <iframe
                        className="w-full h-[540px]"
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(urlPreview)}&embedded=true`}
                    />
                    <DialogFooter>
                        <Button size={"sm"} onClick={handleDownload}>
                            <Download />
                            Download
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
