"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputGroupProps {
  label: string
  value: number
  onSave: (value: number) => Promise<void>
  onCancel?: () => void
  icon?: React.ReactNode
}

export const InputGroup = ({ label, value, onSave, onCancel, icon }: InputGroupProps) => {
  const [editMode, setEditMode] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)
  const [originalValue, setOriginalValue] = useState(value) // Store original value
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setOriginalValue(value)
    setCurrentValue(value)
  }, [value])

  const handleSave = async () => {
    try {
      setIsLoading(true)
      await onSave(currentValue)
      setEditMode(false)
    } catch (error) {
      console.error("Error:", error)
      setCurrentValue(originalValue)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setCurrentValue(originalValue)
    setEditMode(false)
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 w-full">
        {icon && <span>{icon}</span>}
        <label className="text-sm font-medium">{label}</label>
      </div>

      {editMode ? (
        <div className="flex items-center gap-2 flex-1">
          <Input
            type="number"
            value={currentValue}
            onChange={(e) => setCurrentValue(Number(e.target.value))}
            className="w-32"
          />
          <Button onClick={handleSave} size="sm" className="gap-1" disabled={isLoading}>
            <Check className="h-4 w-4" />
            <span>Save</span>
          </Button>
          <Button variant="outline" onClick={handleCancel} size="sm" className="gap-1" disabled={isLoading}>
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4 flex-1">
          <span
            className={cn("w-32 h-10 flex items-center px-3 rounded-md border border-input bg-background", "text-sm")}
          >
            {currentValue}
          </span>
          <Button variant="outline" onClick={() => setEditMode(true)} size="sm">
            Edit
          </Button>
        </div>
      )}
    </div>
  )
}

