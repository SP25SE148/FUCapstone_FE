"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCapstone } from "@/contexts/superadmin/superadmin-capstone-context";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Capstone {
  id: string;
  majorId: string;
  name: string;
  minMember: number;
  maxMember: number;
  reviewCount: number;
  isDeleted: boolean;
  deletedAt: string | null;
}

const formSchema = z.object({
  capstoneName: z.string().min(1, "Capstone Name is required"),
  majorId: z.string().min(1, "Major ID is required"),
  minMember: z.number().min(1, "Min Member must be greater than 0"),
  maxMember: z.number().min(1, "Max Member must be greater than 0"),
  reviewCount: z.number().min(1, "Review Count must be greater than 0"),
});

export default function UpdateCapstone({
  capstone,
  open,
  setOpen,
}: {
  capstone: Capstone;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { updateCapstone } = useCapstone();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      capstoneName: capstone.name,
      majorId: capstone.majorId,
      minMember: capstone.minMember,
      maxMember: capstone.maxMember,
      reviewCount: capstone.reviewCount,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      id: capstone.id,
      majorId: values.majorId,
      name: values.capstoneName,
      minMember: values.minMember,
      maxMember: values.maxMember,
      reviewCount: values.reviewCount,
      isDeleted: capstone.isDeleted,
      deletedAt: capstone.deletedAt,
    };
    await updateCapstone(data);
    setOpen(false); // Close the dialog after updating
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update capstone</DialogTitle>
          <DialogDescription>
            Update the details of the capstone below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
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
            <Button type="submit" className="mt-4">
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}