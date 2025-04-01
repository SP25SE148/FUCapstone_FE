"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useSupervisorDefense } from "@/contexts/supervisor/supervisor-defense-context";

interface UploadMinutesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defendCapstoneCalendarId: string; 
}

const UploadMinutes: React.FC<UploadMinutesProps> = ({ open, onOpenChange, defendCapstoneCalendarId }) => {
  const { importThesisDefendCapstoneMinute } = useSupervisorDefense();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
      onOpenChange(false); 
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Minutes</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input type="file" accept=".docx" onChange={handleFileChange} />
          <Button className="w-full" onClick={handleUpload} disabled={isUploading}>
            <Upload className="mr-2" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadMinutes;