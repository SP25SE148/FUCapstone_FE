"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCampus } from "@/contexts/campus-context";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Campus {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
}

const formSchema = z.object({
  campusName: z.string().min(1, "Campus Name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

export default function UpdateCampus({
  campus,
  open,
  setOpen,
}: {
  campus: Campus;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { updateCampus } = useCampus();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campusName: campus.name,
      address: campus.address,
      phone: campus.phone,
      email: campus.email,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      values.campusName === campus.name &&
      values.address === campus.address &&
      values.phone === campus.phone &&
      values.email === campus.email
    ) {
      toast("No changes detected");
      return;
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
    };
    await updateCampus(data);
    setOpen(false);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update campus</DialogTitle>
          <DialogDescription>
            Update the details of the campus below.
          </DialogDescription>
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
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}