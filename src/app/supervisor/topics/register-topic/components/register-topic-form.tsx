"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Send, Loader2 } from "lucide-react";

import { useSupervisorTopicRegister } from "@/contexts/supervisor/supervisor-topic-register-context";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { TextEditorField } from "@/components/layout/tiptap-editor";

const difficulties = [
  { value: "0", name: "Easy" },
  { value: "1", name: "Medium" },
  { value: "2", name: "Hard" },
];

const formSchema = z.object({
  capstoneId: z.string().min(1, "Capstone is required"),
  englishName: z.string().min(1, "English Name is required"),
  vietnameseName: z.string().min(1, "Vietnamese Name is required"),
  abbreviation: z.string().min(1, "Abbreviation is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.string().min(1, "Difficulty Level is required"),
  businessArea: z.string().min(1, "Business Area is required"),
  file: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "Invalid file input",
    })
    .refine((files) => files?.length === 1, {
      message: "Please select one file.",
    })
    .refine((files) => {
      const allowedTypes = [
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      ];
      return allowedTypes.includes(files[0].type);
    }, {
      message: "Only accept Word (.doc, .docx) files.",
    }),
  coSupervisorEmails: z.string().optional(),
});

export default function RegisterTopicForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { businessAreaList, capstoneList, getTopicRegistrationTemplate, registerTopic } = useSupervisorTopicRegister();

  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      capstoneId: "",
      englishName: "",
      vietnameseName: "",
      abbreviation: "",
      description: "",
      difficulty: "",
      businessArea: "",
      file: undefined,
      coSupervisorEmails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("CapstoneId", values.capstoneId);
      formData.append("BusinessAreaId", values.businessArea);
      formData.append("EnglishName", values.englishName);
      formData.append("VietnameseName", values.vietnameseName);
      formData.append("Abbreviation", values.abbreviation);
      formData.append("Description", values.description);
      formData.append("DifficultyLevel", values.difficulty);
      if (values.file) {
        const file = values.file[0]; // Lấy file đầu tiên
        formData.append("File", file);
      }
      formData.append("CoSupervisorEmails", values.coSupervisorEmails || "");
      const res: any = await registerTopic(formData);
      if (res?.isSuccess) {
        form.reset({
          capstoneId: "",
          englishName: "",
          vietnameseName: "",
          abbreviation: "",
          description: "",
          difficulty: "",
          businessArea: "",
          file: undefined,
          coSupervisorEmails: "",
        });
      };
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsLoading(false);
      setIsConfirmOpen(false);
    }
  }

  const handleConfirm = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setIsConfirmOpen(true);
    }
  };

  async function handleDownload() {
    const url = await getTopicRegistrationTemplate();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = "Template_Register_Topic"; // Đặt tên file khi tải về
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="capstoneId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capstone <span className="text-red-500">*</span></FormLabel>
                <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value} disabled={capstoneList?.length == 0 || isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a capstone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {capstoneList?.map((capstone: any, index) => (
                      <SelectItem key={index} value={capstone?.id}><strong>{capstone?.id}</strong> - <span className="text-muted-foreground text-xs">{capstone?.name}</span></SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="englishName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="English Name..." {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vietnameseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vietnamese Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Vietnamese Name..." {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="abbreviation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Abbreviations <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Abbreviations..." {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                   <TextEditorField
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty level <span className="text-red-500">*</span></FormLabel>
                <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value} disabled={difficulties.length == 0 || isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {difficulties?.map((difficulty: any, index) => (
                      <SelectItem key={index} value={difficulty?.value}><strong>{difficulty?.name}</strong></SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Area <span className="text-red-500">*</span></FormLabel>
                <Select key={field.value} onValueChange={field.onChange} defaultValue={field.value} disabled={businessAreaList.length == 0 || isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {businessAreaList?.map((businessArea: any, index) => (
                      <SelectItem key={index} value={businessArea?.id}><strong>{businessArea?.name}</strong></SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input ref={fileInputRef} type="file" accept=".docx, .doc" onChange={(e) => field.onChange(e.target.files)} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coSupervisorEmails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Co Supervisor Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="justify-between">
          <Button
            type="button"
            variant={"outline"}
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={handleDownload}
          >
            <Download />
            Template
          </Button>
          <Button type="button" onClick={handleConfirm}>
            <Send />
            Register
          </Button>
        </CardFooter>

        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Registration</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to register this topic?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center" onClick={() => { form.handleSubmit(onSubmit)() }} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                {isLoading ? "Sending" : "Confirm"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};