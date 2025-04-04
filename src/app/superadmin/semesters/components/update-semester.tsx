"use client"

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
  DialogDescription,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { useSemester } from "@/contexts/superadmin/superadmin-semester-context"

const formSchema = z
  .object({
    name: z.string().min(1, "Semester Name is required"),
    id: z.string().min(1, "Semester ID is required"),
    startDate: z
      .date({
        required_error: "Start Date is required",
      }),
    endDate: z.date({
      required_error: "End Date is required",
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End Date cannot be before Start Date",
    path: ["endDate"],
  })

  export default function UpdateSemester({ semester, open, setOpen }: { semester: any, open: boolean, setOpen: (open: boolean) => void }) {
  const { updateSemester } = useSemester()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: semester.id,
      name: semester.name,
      startDate: new Date(semester.startDate),
      endDate: new Date(semester.endDate),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      id: values.id,
      name: values.name,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
    };
    await updateSemester(data);
    setOpen(false);
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
      {/* <DialogTrigger asChild>
        <Button variant="ghost" className="px-2 py-1 font-medium">Edit</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[700px] p-6">
      <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Update Semester</DialogTitle>
          <DialogDescription>Update the details of the selected semester.</DialogDescription>
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
                      <Input {...field} disabled />
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
                      <Input {...field} />
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
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
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
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </FormControl>
                    <FormMessage />
                    {field.value && (
                      <p className="text-sm text-muted-foreground mt-1">Selected: {format(field.value, "PPP")}</p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full mt-6" type="submit">
              Update Semester
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

