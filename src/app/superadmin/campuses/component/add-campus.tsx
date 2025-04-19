"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Building, CirclePlus, Hash, Mail, MapPin, Phone } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCampus } from "@/contexts/superadmin/superadmin-campus-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  campusName: z.string().min(1, "Campus Name is required"),
  campusCode: z.string().min(1, "Campus Code is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10, "Phone must be 10-12 characters").max(12, "Phone must be 10-12 characters"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

export default function AddCampus() {
  const { addCampus } = useCampus();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campusName: "",
      campusCode: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      id: values.campusCode,
      name: values.campusName,
      address: values.address,
      phone: values.phone,
      email: values.email,
      isDeleted: false,
      createdDate: new Date().toISOString(),
      updatedDate: null,
      createdBy: "Super Admin",
      updatedBy: null,
      deletedAt: null,
    };
    await addCampus(data);
    setOpen(false);
    form.reset();
  }

  function handleDialogClose() {
    setOpen(false);
    form.reset();
    form.clearErrors();
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
        <Button className="mr-6">
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Campus
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Building className="h-5 w-5" />
            Add New Campus
          </DialogTitle>
          <DialogDescription>Fill in the details below to add a new campus to the system.</DialogDescription>
        </DialogHeader>

        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
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
                    name="campusCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Hash className="h-4 w-4 text-gray-500" />
                          Campus Code
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: FUH" {...field} className="h-10" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

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
                    <CirclePlus className="mr-2 h-4 w-4" />
                    Add Campus
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