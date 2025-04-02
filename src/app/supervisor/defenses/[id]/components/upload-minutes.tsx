"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { File, FileText, Upload, X } from "lucide-react"
import { useState, useRef } from "react"
import { useSupervisorDefense } from "@/contexts/supervisor/supervisor-defense-context"

interface UploadMinutesProps {
  defendCapstoneCalendarId: string
}

const UploadMinutes: React.FC<UploadMinutesProps> = ({ defendCapstoneCalendarId }) => {
  const { importThesisDefendCapstoneMinute } = useSupervisorDefense()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file before uploading.")
      return
    }

    const formData = new FormData()
    formData.append("File", selectedFile)
    formData.append("DefendCapstoneCalendarId", defendCapstoneCalendarId)

    setIsUploading(true)
    try {
      await importThesisDefendCapstoneMinute(formData)
      setOpen(false)
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to upload file. Please try again.")
    } finally {
      setIsUploading(false)
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
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2 px-4" variant="default">
        <Upload className="h-4 w-4 mr-2" />
        Upload Minutes
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Upload Minutes
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="text-sm text-muted-foreground">Upload the defense minutes document in DOCX format.</div>

            {!selectedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
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
                    <p className="text-xs text-muted-foreground mt-1">or click to browse files (DOCX only)</p>
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="mt-2">
                    Select File
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium line-clamp-1">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={clearSelectedFile} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <Button className="w-full h-11" onClick={handleUpload} disabled={!selectedFile || isUploading}>
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Minutes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UploadMinutes

