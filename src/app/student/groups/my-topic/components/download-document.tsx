"use client"

import { useState } from "react";
import { Download } from "lucide-react";

import { Topic } from "@/types/types";
import { useStudentGroup } from "@/contexts/student/student-group-context";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function DownloadDocument(
    { topic }: { topic: Topic }
) {
    const { getPresignedUrlTopicDocument } = useStudentGroup();

    const [open, setOpen] = useState<boolean>(false);
    const [urlPreview, setUrlPreview] = useState<string>("");

    async function handleClickPreview() {
        const url = await getPresignedUrlTopicDocument(topic?.id);
        setUrlPreview(url);
        setOpen(true);
    }

    async function handleDownload() {
        if (!urlPreview) return;
        const a = document.createElement("a");
        a.href = urlPreview;
        a.download = topic?.englishName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <>
            <Button
                variant={"outline"}
                onClick={handleClickPreview}
                className="mr-6 border-primary text-primary hover:bg-primary hover:text-white"
            >
                <Download />
                Document
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl w-full">
                    <DialogHeader>
                        <DialogTitle>Preview</DialogTitle>
                        <DialogDescription>Document of <strong className="text-primary">{topic?.englishName}</strong></DialogDescription>
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
    )
}