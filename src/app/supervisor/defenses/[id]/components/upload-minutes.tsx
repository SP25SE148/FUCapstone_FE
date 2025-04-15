"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, File, FileSpreadsheet, FileText, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { useSupervisorDefense } from "@/contexts/supervisor/supervisor-defense-context";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UploadMinutesProps {
  defendCapstoneCalendarId: string;
}

const UploadMinutes: React.FC<UploadMinutesProps> = ({
  defendCapstoneCalendarId,
}) => {
  const { importThesisDefendCapstoneMinute, getDefenseThesisTemplate } = useSupervisorDefense();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("File", selectedFile);
    formData.append("DefendCapstoneCalendarId", defendCapstoneCalendarId);

    setIsUploading(true);
    try {
      await importThesisDefendCapstoneMinute(formData);
      setOpen(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
  };

  async function handleDownload() {
    const url = await getDefenseThesisTemplate();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = "Template_Defense_Thesis_Minutes"; // Đặt tên file khi tải về
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4"
        variant="default"
      >
        <Upload className="h-4 w-4" />
        Minutes
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="min-w-96 max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Upload Minutes
            </AlertDialogTitle>
            <Button
                variant="outline"
                type="button"
                disabled={isUploading}
                onClick={handleClose}
                className="absolute top-2 right-2"
              >
                <X className="h-1 w-1" />
              </Button>
          </AlertDialogHeader>

          <div className="space-y-5 py-2">
            <div className="text-sm text-muted-foreground">
              Upload the defense minutes document in DOCX format.
            </div>

            {!selectedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="rounded-full bg-muted p-3">
                    <File className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Drag and drop your file here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      or click to browse files (DOCX only)
                    </p>
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".docx"
                    onChange={handleFileChange}
                    className="hidden"
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
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between max-w-2xl">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="rounded-md bg-primary/10 p-2 flex-shrink-0">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <p
                        className="text-sm font-medium truncate"
                        title={selectedFile.name}
                      >
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={clearSelectedFile}
                    className="h-8 w-8 flex-shrink-0 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            <AlertDialogFooter className="flex justify-between items-center">
              
              <Button
                variant={"outline"}
                type="button"
                disabled={isUploading}
                className="flex-1"
                onClick={handleDownload}
              >
                <Download />
                Template
              </Button>

              <Button
                className="flex-1"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
              >
                <Upload className="h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UploadMinutes;
