"use client";

import { z } from "zod";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCapstone } from "@/contexts/superadmin/superadmin-capstone-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const formSchema = z.object({
  capstoneId: z.string().min(1, "Capstone ID is required"),
  capstoneName: z.string().min(1, "Capstone Name is required"),
  majorId: z.string().min(1, "Major ID is required"),
  minMember: z.number().min(1, "Min Member must be greater than 0"),
  maxMember: z.number().min(1, "Max Member must be greater than 0"),
  reviewCount: z.number().min(1, "Review Count must be greater than 0"),
});

export default function AddCapstone() {
  const { addCapstone } = useCapstone();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      capstoneId: "",
      capstoneName: "",
      majorId: "",
      minMember: 0,
      maxMember: 0,
      reviewCount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      id: values.capstoneId,
      majorId: values.majorId,
      name: values.capstoneName,
      minMember: values.minMember,
      maxMember: values.maxMember,
      reviewCount: values.reviewCount,
      isDeleted: false,
      deletedAt: null,
    };
    await addCapstone(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-6">
          <CirclePlus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new capstone</DialogTitle>
          <DialogDescription>Fill information to add new capstone</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="capstoneId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capstone ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: CS101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capstoneName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capstone Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Capstone Project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="majorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: CS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minMember"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Member</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxMember"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Member</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reviewCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Count</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 2" {...field} />
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