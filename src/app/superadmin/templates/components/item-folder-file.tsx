"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Download, EllipsisVertical, File, Folders, Loader2, Trash2, X } from "lucide-react";

import { getDate } from "@/lib/utils";
import { Template } from "@/types/types";
import { useSuperadminTemplate } from "@/contexts/superadmin/superadmin-template-context";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";

export default function ItemFolderFile({ item }: { item: Template }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const folderId = searchParams.get("folderId");
    const { getTemplateById, fetchTemplateList, getPresignedUrlTemplateDocument, deleteTemplateDocument, updateStatusTemplateDocument } = useSuperadminTemplate();

    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [urlPreview, setUrlPreview] = useState<string>("");
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [openConfirmChangeStatus, setOpenConfirmChangeStatus] = useState<boolean>(false);

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

    async function handleDelete() {
        setIsLoading(true);
        try {
            const res: any = await deleteTemplateDocument(item?.id);
            if (res?.isSuccess) {
                if (folderId) {
                    getTemplateById(folderId);
                } else {
                    fetchTemplateList();
                }
                setOpenConfirmDelete(false);
            }
        } finally {
            setIsLoading(false);
            setOpenConfirmDelete(false);
        }
    }

    async function handleChangeStatus() {
        setIsLoading(true);
        try {
            const res: any = await updateStatusTemplateDocument(item?.id);
            if (res?.isSuccess) {
                if (folderId) {
                    getTemplateById(folderId);
                } else {
                    fetchTemplateList();
                }
                setOpenConfirmChangeStatus(false);
            }
        } finally {
            setIsLoading(false);
            setOpenConfirmChangeStatus(false);
        }
    }

    return (
        <>
            <div
                className="grid grid-cols-7 gap-2 p-2 items-center text-sm cursor-pointer select-none hover:bg-muted"
                onClick={() => {

                }}
                onDoubleClick={() => {
                    if (item?.isFile) {
                        handleClickPreview()
                    } else {
                        router.push(`/superadmin/templates/${item?.fileName}?folderId=${item?.id}`)
                    }
                }}
            >
                <div className="col-span-3 overflow-hidden flex items-center gap-2 text-primary font-bold">
                    {item?.isFile ? <File className="size-5" /> : <Folders className="size-5" />}
                    {item?.fileName}
                </div>
                <div className="text-muted-foreground text-right">{getDate(item?.createdDate)}</div>
                <div className="text-muted-foreground text-right">{item?.isFile ? "File" : "Folder"}</div>
                <div className="text-muted-foreground flex items-end justify-center">{item?.isFile && item?.isActive && <Check />}</div>
                <div className="text-center">
                    {item?.isFile && !item?.isActive
                        &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"outline"} size={"icon"}>
                                    <EllipsisVertical />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 font-bold focus:text-white focus:bg-red-600"
                                    onClick={() => { setOpenConfirmDelete(true) }}
                                >
                                    <Trash2 />
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer font-bold"
                                    onClick={() => { setOpenConfirmChangeStatus(true) }}
                                >
                                    <Check />
                                    Active
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    {!item?.isFile &&
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            onClick={() => { setOpenConfirmDelete(true) }}
                            className="text-red-600 hover:text-white hover:bg-red-600"
                        >
                            <Trash2 />
                        </Button>
                    }
                </div>
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

            {/* Confirm delete */}
            <AlertDialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to delete this {item?.isFile ? "file" : "folder"}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete all data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            className="bg-background text-foreground border shadow-none hover:bg-red-600 hover:text-background"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="animate-spin" />}
                            {isLoading ? "Deleting" : "Delete"}
                        </Button>
                        <AlertDialogCancel className="bg-primary text-background border shadow-none hover:bg-primary hover:text-background">Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Confirm change status */}
            <AlertDialog open={openConfirmChangeStatus} onOpenChange={setOpenConfirmChangeStatus}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to change status this {item?.isFile ? "file" : "folder"}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please check carefully before performing this action.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            onClick={handleChangeStatus}
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="animate-spin" />}
                            {isLoading ? "Please Wait" : "Continue"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
