"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import { useState } from "react"
import { useSupervisorDefense } from "@/contexts/supervisor/supervisor-defense-context"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface ContinueDefenseProps {
  defendCapstoneCalendarId: string
}

const ContinueDefense: React.FC<ContinueDefenseProps> = ({ defendCapstoneCalendarId }) => {
  const { updatePresidentDecisionForGroupStatus, getThesisPresignedUrl } = useSupervisorDefense()
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState("2nd Defense")
  const [isSaving, setIsSaving] = useState(false)
  const [urlPreview, setUrlPreview] = useState<string>("")

  async function handleClickPreview() {
    const url = await getThesisPresignedUrl(defendCapstoneCalendarId)
    setUrlPreview(url)
    setOpen(true)
  }

  const handleSave = async () => {
    const isReDefend = selectedOption === "2nd Defense"

    const requestData = {
      IsReDefendCapstoneProject: isReDefend,
      CalendarId: defendCapstoneCalendarId,
    }

    setIsSaving(true)
    try {
      await updatePresidentDecisionForGroupStatus(requestData)
      setOpen(false)
      router.push("/supervisor/defenses")
    } catch (error) {
      console.error("Error updating decision:", error)
      alert("Failed to update decision. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <Button onClick={handleClickPreview} className="flex items-center gap-2 px-4 py-2" variant="default">
        Continue
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-xl font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Defense decision
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-4 p-6 pt-2">
            <div className="border rounded-lg overflow-hidden bg-muted/30">
              <iframe
                className="w-full h-[65vh] min-h-[500px]"
                src={`https://docs.google.com/gview?url=${encodeURIComponent(urlPreview)}&embedded=true`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Select Decision:</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className={cn(
                    "h-14 rounded-lg transition-all",
                    selectedOption === "2nd Defense" && "ring-2 ring-primary bg-primary/5",
                  )}
                  onClick={() => setSelectedOption("2nd Defense")}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-medium">2nd Defense</span>
                    <span className="text-xs text-muted-foreground">Defend thesis again next time</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "h-14 rounded-lg transition-all",
                    selectedOption === "Finish" && "ring-2 ring-primary bg-primary/5",
                  )}
                  onClick={() => setSelectedOption("Finish")}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-medium">Finish</span>
                    <span className="text-xs text-muted-foreground">Complete the defense</span>
                  </div>
                </Button>
              </div>

              <Button className="w-full h-11 mt-4" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Decision"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ContinueDefense

