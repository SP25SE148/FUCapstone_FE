"use client"

import type React from "react"

import * as XLSX from "xlsx"
import { useState, useRef, useEffect } from "react"
import { Download, FileSpreadsheet, Loader2, Upload, X } from "lucide-react"

import { Semester } from "@/types/types"
import { useManagerDefense } from "@/contexts/manager/manager-defense-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

export default function UploadDefenseCalendar({ refresh }: { refresh?: any }) {
  const { semesters, getSemestersBetweenCurrentDate, importDefenseCalendar, getDefensesCalendarTemplate } = useManagerDefense()

  const [open, setOpen] = useState<boolean>(false)
  const [fileData, setFileData] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [openPreview, setOpenPreview] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedSemester, setSelectedSemester] = useState<string | undefined>()

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
    const url = await getDefensesCalendarTemplate()
    if (!url) return
    const a = document.createElement("a")
    a.href = url
    a.download = "Template_Import_Defense_Calendar"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
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
      selectedSemester && formData.append("SemesterId", selectedSemester)
      formData.append("File", selectedFile)
      const res: any = await importDefenseCalendar(formData)
      if (res?.isSuccess) {
        setSelectedFile(null)
        setOpen(false)
        if (refresh) refresh()
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      setErrorMessage("Failed to upload file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (open) {
      getSemestersBetweenCurrentDate();
    }
  }, [open])

  useEffect(() => {
    if (semesters && semesters.length > 0) {
      setSelectedSemester(semesters[0].id)
    }
  }, [semesters])

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          clearSelectedFile();
          setOpen(!open);
        }}
      >
        <DialogTrigger asChild>
          <Button className="mr-6 flex items-center gap-2 px-4">
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center">
              <FileSpreadsheet className="mr-2 h-5 w-5" />
              Upload Defense Calendar
            </DialogTitle>
            <DialogDescription>Download template and upload defense calendar for capstone.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h3 className="text-sm text-muted-foreground">Semester:</h3>
              {semesters ? (
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters?.map((semester: Semester, index: number) => (
                      <SelectItem key={index} value={semester.id}>
                        <strong>{semester.id}</strong> - <span className="text-muted-foreground text-xs">{semester.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Skeleton className="h-10 w-[180px]" />
              )}
            </div>

            <div>
              {!selectedFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
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
                </div>
              ) : (
                <div className="border rounded-lg p-4">
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
                </div>
              )}
              {errorMessage && <p className="text-sm text-destructive mt-2">{errorMessage}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button" disabled={isUploading} onClick={handleDownload} className="h-11">
                <Download />
                Template
              </Button>
              <Button type="button" disabled={isUploading || !selectedFile} className="h-11" onClick={handleUpload}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center">
              <FileSpreadsheet className="mr-2 h-5 w-5" />
              File Preview
            </DialogTitle>
            <DialogDescription>Review the contents of the file before confirming the upload.</DialogDescription>
          </DialogHeader>
          {fileData.length > 0 && (
            <div className="w-full h-[540px] overflow-auto border rounded-lg">
              <Table>
                <TableHeader className="sticky top-0 bg-background">
                  <TableRow>
                    {Object.keys(fileData[0]).map((key) => (
                      <TableHead key={key} className="min-w-[200px] font-semibold">
                        {key}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fileData.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((cell, i) => (
                        <TableCell key={i} className="align-top">
                          {cell as string}
                        </TableCell>
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

