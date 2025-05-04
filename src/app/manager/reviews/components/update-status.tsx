"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Clock, Pencil, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

enum ReviewCalendarStatus {
  Pending = 0,
  InProgress = 1,
  Done = 2,
}

interface UpdateStatusProps {
  onUpdate: (newStatus: ReviewCalendarStatus) => Promise<void> 
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ onUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<ReviewCalendarStatus | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      setSelectedStatus(null)
    }
  }, [isDialogOpen])

  const availableStatuses = Object.values(ReviewCalendarStatus).filter(
    (status) => typeof status === "number",
  ) as ReviewCalendarStatus[]

  const handleUpdate = async () => {
    if (!selectedStatus) {
      setIsDialogOpen(false)
      return
    }

    setIsUpdating(true)
    try {
      await onUpdate(selectedStatus)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setIsDialogOpen(false)
      }, 1500)
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusConfig = (status: ReviewCalendarStatus) => {
    switch (status) {
      case ReviewCalendarStatus.Pending:
        return {
          label: "Pending",
          color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
          icon: <Clock className="w-4 h-4 mr-1" />,
          badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
        }
      case ReviewCalendarStatus.InProgress:
        return {
          label: "In Progress",
          color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
          icon: <RefreshCw className="w-4 h-4 mr-1" />,
          badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        }
      case ReviewCalendarStatus.Done:
        return {
          label: "Done",
          color: "bg-green-100 text-green-800 hover:bg-green-200",
          icon: <CheckCircle2 className="w-4 h-4 mr-1" />,
          badgeColor: "bg-green-100 text-green-800 border-green-200",
        }
      default:
        return {
          label: "Unknown",
          color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          icon: <Clock className="w-4 h-4 mr-1" />,
          badgeColor: "bg-gray-100 text-gray-800 border-gray-200",
        }
    }
  }

  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)} className="flex items-center gap-1">
        <Pencil className="w-2 h-2" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Review Calendar Status</DialogTitle>
          </DialogHeader>

          {showSuccess ? (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Status Updated Successfully</h3>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select New Status</label>
                  <Select
                    value={selectedStatus?.toString()}
                    onValueChange={(value) => setSelectedStatus(Number(value) as ReviewCalendarStatus)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status">
                        {selectedStatus !== null && (
                          <div className="flex items-center">
                            {getStatusConfig(selectedStatus).icon}
                            {getStatusConfig(selectedStatus).label}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {availableStatuses.map((status) => {
                        const config = getStatusConfig(status)
                        return (
                          <SelectItem key={status} value={status.toString()} className="flex items-center">
                            <div className="flex items-center">
                              {config.icon}
                              {config.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="flex sm:justify-between gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isUpdating}
                  className="sm:w-1/2"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleUpdate}
                  disabled={isUpdating || selectedStatus === null}
                  className={cn("sm:w-1/2", isUpdating ? "opacity-80" : "")}
                >
                  {isUpdating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Status"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateStatus
