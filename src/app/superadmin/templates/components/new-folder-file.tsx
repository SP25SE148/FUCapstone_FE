import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, File, Folder, Loader2, Upload } from "lucide-react";

import { useSuperadminTemplate } from "@/contexts/superadmin/superadmin-template-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"

const formSchemaFolder = z.object({
    folderName: z.string()
        .min(1, "Folder name must be at least 1 characters.")
        .max(50, "Folder name must not exceed 50 characters"),
});

const formSchemaFile = z.object({
    file: z
        .custom<FileList>((val) => val instanceof FileList, {
            message: "Invalid file input",
        })
        .refine((files) => files?.length === 1, {
            message: "Please select one file.",
        })
        .refine((files) => {
            const allowedTypes = [
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
                "application/msword", // .doc
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
            ];
            return allowedTypes.includes(files[0].type);
        }, {
            message: "Only accept Word (.doc, .docx) or Excel (.xlsx) files.",
        }),
});

export default function NewFolderFile() {
    const searchParams = useSearchParams();
    const folderId = searchParams.get("folderId");
    const { fetchTemplateList, getTemplateById, createFolderTemplateDocument, createFileTemplateDocument } = useSuperadminTemplate();

    const [isLoading, setIsLoading] = useState(false);
    const [openAddFile, setOpenAddFile] = useState<boolean>(false);
    const [openAddFolder, setOpenAddFolder] = useState<boolean>(false);

    const formFolder = useForm<z.infer<typeof formSchemaFolder>>({
        resolver: zodResolver(formSchemaFolder),
        defaultValues: {
            folderName: "",
        },
    });

    async function onSubmitFolder(values: z.infer<typeof formSchemaFolder>) {
        setIsLoading(true);
        const data = {
            ...values,
            parentId: folderId || ""
        }
        try {
            const res: any = await createFolderTemplateDocument(data);
            if (res?.isSuccess) {
                formFolder.reset();
                if (folderId) {
                    getTemplateById(folderId);
                } else {
                    fetchTemplateList();
                }
                setOpenAddFolder(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const formFile = useForm<z.infer<typeof formSchemaFile>>({
        resolver: zodResolver(formSchemaFile),
        defaultValues: {
            file: undefined,
        },
    });

    async function onSubmitFile(values: z.infer<typeof formSchemaFile>) {
        if (!folderId) {
            console.log(1);

            return;
        }
        setIsLoading(true);
        try {
            const file = values.file[0]; // Lấy file đầu tiên
            const formData = new FormData();
            formData.append("File", file);
            formData.append("ParentId", folderId);
            const res: any = await createFileTemplateDocument(formData);
            if (res?.isSuccess) {
                formFile.reset();
                getTemplateById(folderId);
                setOpenAddFile(false)
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {folderId
                ?
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="m-6" onClick={() => setOpenAddFolder(true)}>
                            <CirclePlus />
                            New
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setOpenAddFolder(true)}
                        >
                            <Folder />
                            Folder
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setOpenAddFile(true)}
                        >
                            <File />
                            File
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                :
                <Button className="m-6" onClick={() => setOpenAddFolder(true)}>
                    <CirclePlus />
                    Folder
                </Button>
            }

            {/* folder */}
            <Dialog open={openAddFolder} onOpenChange={setOpenAddFolder}>
                <DialogContent className="max-w-md">
                    <Form {...formFolder}>
                        <form onSubmit={formFolder.handleSubmit(onSubmitFolder)} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Create new folder</DialogTitle>
                                <DialogDescription>Please enter folder name</DialogDescription>
                            </DialogHeader>
                            <FormField
                                control={formFolder.control}
                                name="folderName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Folder name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Topics" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button className="w-full" type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <CirclePlus />
                                            Create
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* file */}
            <Dialog open={openAddFile} onOpenChange={setOpenAddFile}>
                <DialogContent className="max-w-md">
                    <Form {...formFile}>
                        <form onSubmit={formFile.handleSubmit(onSubmitFile)} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Upload new file</DialogTitle>
                                <DialogDescription>Please select file to upload</DialogDescription>
                            </DialogHeader>
                            <FormField
                                control={formFile.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File</FormLabel>
                                        <FormControl>
                                            <Input type="file" accept=".xlsx, .doc, .docx" onChange={(e) => field.onChange(e.target.files)} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button className="w-full" type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload />
                                            Upload
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}