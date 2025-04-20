"use client";

import { z } from "zod";
import {
  CirclePlus,
  BookOpen,
  Hash,
  Users,
  ClipboardList,
  Calendar,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCapstone } from "@/contexts/superadmin/superadmin-capstone-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Major } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  capstoneId: z.string().min(1, "Capstone ID is required"),
  capstoneName: z.string().min(1, "Capstone Name is required"),
  majorId: z.string().min(1, "Major ID is required"),
  minMember: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Min Member must be greater than 0" }),
  maxMember: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Max Member must be greater than 0" }),
  reviewCount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Review Count must be greater than 0",
    }),
  durationWeeks: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Duration Weeks must be greater than 0",
    }),
});

export default function AddCapstone() {
  const { addCapstone, fetchMajorList } = useCapstone();
  const [open, setOpen] = useState(false);
  const [majorList, setMajorList] = useState<Major[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      capstoneId: "",
      capstoneName: "",
      majorId: "",
      minMember: 0,
      maxMember: 0,
      reviewCount: 0,
      durationWeeks: 0,
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    form.reset();
    form.clearErrors();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      id: values.capstoneId,
      majorId: values.majorId,
      name: values.capstoneName,
      minMember: values.minMember,
      maxMember: values.maxMember,
      reviewCount: values.reviewCount,
      durationWeeks: values.durationWeeks,
      isDeleted: false,
      deletedAt: null,
    };
    await addCapstone(data);
    handleClose();
  }

  useEffect(() => {
    (async function getMajors() {
      const majors: Major[] = await fetchMajorList();
      setMajorList(majors);
    })();
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        } else {
          handleOpen();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="mr-6">
          <CirclePlus className="h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Add New Capstone
          </DialogTitle>
          <DialogDescription>
            Fill information to add new capstone
          </DialogDescription>
        </DialogHeader>

        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="capstoneId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Hash className="h-4 w-4 text-gray-500" />
                          Capstone ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: CS101"
                            {...field}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capstoneName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          Capstone Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Capstone Project"
                            {...field}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="majorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-medium">
                        <Hash className="h-4 w-4 text-gray-500" />
                        Major
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a major" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {majorList?.map((major: Major, index) => (
                            <SelectItem key={index} value={major?.id}>
                              <strong>{major?.id}</strong> -{" "}
                              <span className="text-muted-foreground text-xs">
                                {major?.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="minMember"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Users className="h-4 w-4 text-gray-500" />
                          Min Member
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 3"
                            {...field}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxMember"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Users className="h-4 w-4 text-gray-500" />
                          Max Member
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 5"
                            {...field}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="reviewCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <ClipboardList className="h-4 w-4 text-gray-500" />
                          Review Count
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 2"
                            {...field}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="durationWeeks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          Duration Weeks
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 12"
                            {...field}
                            className="h-10"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-3">
                  <Button type="submit" className="w-full">
                    <CirclePlus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
