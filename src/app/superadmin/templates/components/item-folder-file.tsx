"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, File, Folders } from "lucide-react";

import { getDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Template, useSuperadminTemplate } from "@/contexts/superadmin/superadmin-template-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

export default function ItemFolderFile({ item }: { item: Template }) {
    const router = useRouter();
    const { getPresignedUrlTemplateDocument } = useSuperadminTemplate();

    const [open, setOpen] = useState<boolean>(false);
    const [urlPreview, setUrlPreview] = useState<string>("");

    async function handleClickPreview() {
        const url = await getPresignedUrlTemplateDocument(item.id);
        setUrlPreview(url);
        setOpen(true);
    }

    async function handleDownload() {
        if (!urlPreview) return;
        const a = document.createElement("a");
        a.href = urlPreview;
        a.download = item.fileName; // Đặt tên file khi tải về
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <>
            <div
                className="grid grid-cols-3 gap-2 p-2 items-center text-sm cursor-pointer select-none hover:bg-muted"
                onDoubleClick={() => {
                    if (item?.isFile) {
                        handleClickPreview()
                    } else {
                        router.push(`/superadmin/templates/${item?.fileName}?folderId=${item?.id}`)
                    }
                }}
            >
                <div className="col-span-2 overflow-hidden flex items-center gap-2">
                    {item?.isFile ? <File className="size-5" /> : <Folders className="size-5" />}
                    {item?.fileName}
                </div>
                <div className="text-muted-foreground">{getDate(item?.createdDate)}</div>
            </div>

            {/* Modal xem trước */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl w-full">
                    <DialogHeader>
                        <DialogTitle>Preview</DialogTitle>
                        <DialogDescription>Content of <strong className="text-primary">{item?.fileName}</strong></DialogDescription>
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
