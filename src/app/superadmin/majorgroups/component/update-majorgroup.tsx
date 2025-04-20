"use client"

import { Pencil, FolderOpen, FileText } from "lucide-react"

import type { MajorGroup } from "@/types/types"
import { useMajorGroup } from "@/contexts/superadmin/superadmin-majorgroup-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  majorGroupName: z.string().min(1, "Major Group Name is required"),
  description: z.string().min(1, "Description is required"),
})

export default function UpdateMajorGroup({
  majorGroup,
  open,
  setOpen,
}: { majorGroup: MajorGroup; open: boolean; setOpen: (open: boolean) => void }) {
  const { updateMajorGroup } = useMajorGroup()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      majorGroupName: majorGroup.name,
      description: majorGroup.description,
    },
  })

  const isFormValid = form.formState.isValid

  const handleUpdateMajorGroup = async (values: z.infer<typeof formSchema>) => {
    const data = {
      id: majorGroup.id,
      name: values.majorGroupName,
      description: values.description,
      isDeleted: majorGroup.isDeleted,
      deletedAt: majorGroup.deletedAt,
    }
    await updateMajorGroup(data)
    setOpen(false)
  }

  const handleOpenChange = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose()
        } else {
          handleOpenChange()
        }
      }}
    >
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Update Major Group
          </DialogTitle>
          <DialogDescription>Update the details of the major group below.</DialogDescription>
        </DialogHeader>

        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateMajorGroup)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="majorGroupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-medium">
                        <FolderOpen className="h-4 w-4 text-gray-500" />
                        Major Group Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Business" {...field} className="h-10" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-medium">
                        <FileText className="h-4 w-4 text-gray-500" />
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Business-related majors." {...field} className="h-10" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="pt-3">
                  <Button type="submit" className="w-full" disabled={!isFormValid}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
