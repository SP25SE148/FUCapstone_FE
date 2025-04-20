"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CirclePlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAdmin } from "@/contexts/superadmin/superadmin-admin-context";

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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Campus } from "@/types/types";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .max(100, "Email cannot exceed 100 characters"),
  fullName: z.string().min(2, "User Name must have at least 2 characters"),
  campusId: z.string().min(2, "Campus ID must have at least 2 characters"),
});

export default function ManuallyAdmin({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { addAdmin, fetchCampusList } = useAdmin();
  const [campusList, setCampusList] = useState<Campus[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      campusId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const adminData = {
      ...values,
      userId: "",
      userCode: "",
      majorId: "",
      capstoneId: "",
    };
    await addAdmin(adminData);
    setOpen(false);
    form.reset();
  }

  useEffect(() => {
    (async function getCampus() {
      const campus: Campus[] = await fetchCampusList();
      setCampusList(campus);
    })();
  }, []);

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Admin</CardTitle>
            <CardDescription>
              Fill in admin information as required below
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: admin5@fpt.edu.vn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Admin 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="campusId"
              // render={({ field }) => (
              //   <FormItem>
              //     <FormLabel>Campus ID</FormLabel>
              //     <FormControl>
              //       <Input placeholder="Ex: CT" {...field} />
              //     </FormControl>
              //     <FormMessage />
              //   </FormItem>
              // )}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-medium">
                    Campus
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Campus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {campusList?.map((campus: Campus, index) => (
                        <SelectItem key={index} value={campus?.id}>
                          <strong>{campus?.id}</strong> -{" "}
                          <span className="text-muted-foreground text-xs">
                            {campus?.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              <CirclePlus />
              Add
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
