"use client"

import * as XLSX from "xlsx";
import { useRef, useState } from "react";
import { Upload, Download, Loader2, FileSpreadsheet, X } from "lucide-react";

import { useAdminSupervisor } from "@/contexts/admin/admin-supervisor-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog"

export default function ImportSupervisor({ onClose }: { onClose: () => void }) {
    const { importSupervisor, getSupervisorsTemplate } = useAdminSupervisor();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileData, setFileData] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                setErrorMessage("Only Excel files (.xlsx) are accepted")
                return
            }

            setErrorMessage("")
            setSelectedFile(file)

            const reader = new FileReader()
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer)
                const workbook = XLSX.read(data, { type: "array" })
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const jsonData = XLSX.utils.sheet_to_json(sheet)
                setFileData(jsonData)
            }
            reader.readAsArrayBuffer(file)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                setErrorMessage("")
                setSelectedFile(file)

                const reader = new FileReader()
                reader.onload = (e) => {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer)
                    const workbook = XLSX.read(data, { type: "array" })
                    const sheetName = workbook.SheetNames[0]
                    const sheet = workbook.Sheets[sheetName]
                    const jsonData = XLSX.utils.sheet_to_json(sheet)
                    setFileData(jsonData)
                }
                reader.readAsArrayBuffer(file)
            } else {
                setErrorMessage("Only Excel files (.xlsx) are accepted")
            }
        }
    }

    const clearSelectedFile = () => {
        setSelectedFile(null)
        setErrorMessage("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " bytes"
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
        else return (bytes / 1048576).toFixed(1) + " MB"
    }

    async function handleDownload() {
        const url = await getSupervisorsTemplate();
        if (!url) return;
        const a = document.createElement("a");
        a.href = url;
        a.download = "Template_Import_Supervisor"; // Đặt tên file khi tải về
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handlePreview = (e: React.MouseEvent) => {
        e.preventDefault()
        if (fileData.length > 0) {
            setOpenPreview(true)
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setErrorMessage("Please select a file before uploading.")
            return
        }

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", selectedFile)
            const res: any = await importSupervisor(formData)
            if (res?.isSuccess) {
                setSelectedFile(null)
                onClose();
            }
        } catch (error) {
            console.error("Error uploading file:", error)
            setErrorMessage("Failed to upload file. Please try again.")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Import list supervisor</CardTitle>
                    <CardDescription>
                        Download template and upload list
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {!selectedFile
                        ?
                        (<div
                            className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className="rounded-full bg-muted p-3">
                                    <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-medium">Drag and drop your Excel file here</p>
                                    <p className="text-xs text-muted-foreground mt-1">or click to browse files (XLSX only)</p>
                                </div>
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".xlsx"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    id="file-upload"
                                />
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-2"
                                >
                                    Select File
                                </Button>
                            </div>
                        </div>)
                        :
                        (<div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-md bg-primary/10 p-2">
                                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium line-clamp-1">{selectedFile.name}</p>
                                        <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" type="button" onClick={clearSelectedFile} className="h-8 w-8">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            {fileData.length > 0 && (
                                <Button variant="link" className="text-xs mt-2 h-auto p-0" onClick={handlePreview} type="button">
                                    Preview file contents
                                </Button>
                            )}
                        </div>)}
                    {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
                </CardContent>
                <CardFooter className="grid w-full grid-cols-2 gap-4">
                    <Button variant={"outline"} type="button" disabled={isUploading} onClick={handleDownload}>
                        <Download />
                        Template
                    </Button>
                    <Button type="submit" disabled={isUploading} onClick={handleUpload}>
                        {isUploading ? (
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
                </CardFooter>
            </Card >

            {/* preview data */}
            <Dialog open={openPreview} onOpenChange={() => { setOpenPreview(false) }}>
                <DialogContent className="max-w-4xl w-full">
                    <DialogHeader>
                        <DialogTitle>Preview</DialogTitle>
                        <DialogDescription>
                            Review to check the contents of the file before confirming.
                        </DialogDescription>
                    </DialogHeader>
                    {fileData.length > 0 && (
                        <div className="w-full h-[540px] overflow-scroll">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {Object.keys(fileData[0]).map((key) => (
                                            <TableHead key={key}>{key}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {fileData.map((row, index) => (
                                        <TableRow key={index}>
                                            {Object.values(row).map((cell, i) => (
                                                <TableCell key={i}>{cell as string}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}