"use client"

import { z } from "zod"
import { toast } from "sonner"
import { Pencil, Building, MapPin, Phone, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import type { Campus } from "@/types/types"
import { useCampus } from "@/contexts/superadmin/superadmin-campus-context"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  campusName: z.string().min(1, "Campus Name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
})

export default function UpdateCampus({
  campus,
  open,
  setOpen,
}: {
  campus: Campus
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const { updateCampus } = useCampus()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campusName: campus.name,
      address: campus.address,
      phone: campus.phone,
      email: campus.email,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      values.campusName === campus.name &&
      values.address === campus.address &&
      values.phone === campus.phone &&
      values.email === campus.email
    ) {
      toast("No changes detected")
      return
    }

    const data = {
      id: campus.id,
      name: values.campusName,
      address: values.address,
      phone: values.phone,
      email: values.email,
      isDeleted: campus.isDeleted,
      createdDate: campus.createdDate,
      updatedDate: new Date().toISOString(),
      createdBy: campus.createdBy,
      updatedBy: null,
      deletedAt: campus.deletedAt,
    }
    await updateCampus(data)
    setOpen(false)
  }

  function handleDialogClose() {
    setOpen(false)
    form.reset()
    form.clearErrors()
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
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Building className="h-5 w-5" />
            Update Campus
          </DialogTitle>
          <DialogDescription>Update the details of the campus below.</DialogDescription>
        </DialogHeader>

        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="campusName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-medium">
                        <Building className="h-4 w-4 text-gray-500" />
                        Campus Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: FPT University Hanoi" {...field} className="h-10" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-medium">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Hoa Lac, Hanoi" {...field} className="h-10" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Phone className="h-4 w-4 text-gray-500" />
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 0123456789" {...field} className="h-10" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Mail className="h-4 w-4 text-gray-500" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: contact@fpt.edu.vn" {...field} className="h-10" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-3">
                  <Button type="submit" className="w-full">
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
