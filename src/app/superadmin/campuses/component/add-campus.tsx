"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
<<<<<<< HEAD
import { useCampus } from "@/contexts/superadmin/superadmin-campus-context";
=======
import { useCampus } from "@/contexts/superadmin/superadmin-campus-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
    if (form.formState.isDirty) {
      const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (confirmClose) {
        setOpen(false);
        form.reset();
      }
    } else {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleDialogClose();
      } else {
        setOpen(true);
      }
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <CirclePlus />
          Add Campus
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new campus</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="campusName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campus Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: FPT University Hanoi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="campusCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campus Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: FUH" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Hoa Lac, Hanoi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 0123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: contact@fpt.edu.vn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              <CirclePlus />
              Add
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}