"use client"

import { useState } from "react"
import { CirclePlus } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { useSemester } from "@/contexts/superadmin/superadmin-semester-context"

const today = new Date()
today.setHours(0, 0, 0, 0)

const formSchema = z
  .object({
    name: z.string().min(1, "Semester Name is required"),
    id: z.string().min(1, "Semester ID is required"),
    startDate: z
      .date({
        required_error: "Start Date is required",
      })
      .min(today, "Start Date must be in the future"),
    endDate: z.date({
      required_error: "End Date is required",
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End Date cannot be before Start Date",
    path: ["endDate"],
  })

export default function AddSemester() {
  const { createSemester } = useSemester()
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      id: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      id: values.id,
      name: values.name,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    }
    await createSemester(data)
    setOpen(false)
    form.reset()
  }

  function handleDialogClose() {
    if (form.formState.isDirty) {
      const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to close?")
      if (confirmClose) {
        setOpen(false)
        form.reset()
      }
    } else {
      setOpen(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleDialogClose()
        } else {
          setOpen(true)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <CirclePlus className="h-4 w-4" />
          Add Semester
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Semester</DialogTitle>
          <DialogDescription>Create a new semester with a unique ID and date range.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Semester ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: SP25" {...field} className="focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Semester Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Spring 2025" {...field} className="focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-medium">Start Date</FormLabel>
                    <FormControl>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < today}
                          initialFocus
                          className="mx-auto"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    {field.value && (
                      <p className="text-sm text-muted-foreground mt-1">Selected: {format(field.value, "PPP")}</p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-medium">End Date</FormLabel>
                    <FormControl>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const startDate = form.getValues("startDate")
                            return startDate && date < startDate
                          }}
                          initialFocus
                          className="mx-auto"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    {field.value && (
                      <p className="text-sm text-muted-foreground mt-1">Selected: {format(field.value, "PPP")}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full mt-6 gap-2 bg-primary hover:bg-primary/90 py-6 text-lg" type="submit">
              <CirclePlus className="h-5 w-5" />
              Add Semester
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

