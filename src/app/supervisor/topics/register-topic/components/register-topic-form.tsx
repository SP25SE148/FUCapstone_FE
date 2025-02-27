"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Send, Loader2, ArrowRight } from "lucide-react";
import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-management";

const difficulties = ["Easy", "Medium", "Hard"];

const formSchema = z.object({
  capstoneId: z.string().min(1, "Capstone is required"),
  englishName: z.string().min(1, "English Name is required"),
  vietnameseName: z.string().min(1, "Vietnamese Name is required"),
  abbreviation: z.string().min(1, "Abbreviation is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.string().min(1, "Difficulty Level is required"),
  businessArea: z.string().min(1, "Business Area is required"),
  file: z.instanceof(File).optional(),
  coSupervisorEmails: z.string().optional(),
});

const RegisterTopicForm: React.FC = () => {
  const { businessAreas, registerTopic } = useSupervisorTopic();
  const { handleSubmit, control, reset } = useForm<z.infer<typeof formSchema>>({
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
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("CapstoneId", data.capstoneId);
    formData.append("BusinessAreaId", data.businessArea);
    formData.append("EnglishName", data.englishName);
    formData.append("VietnameseName", data.vietnameseName);
    formData.append("Abbreviation", data.abbreviation);
    formData.append("Description", data.description);
    formData.append("DifficultyLevel", data.difficulty === "Easy" ? "0" : data.difficulty === "Medium" ? "1" : "2");
    if (file) {
      formData.append("File", file);
    }
    formData.append("CoSupervisorEmails", data.coSupervisorEmails || "");

    await registerTopic(formData);
    reset();
    setFile(null);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="p-8 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="capstone">
              Capstone <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="capstoneId"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="capstone"
                    placeholder="Ex: SEP490"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="englishName">
              English Name <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="englishName"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="englishName"
                    placeholder="Ex: Capstone management system for FPT university teachers and students"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="vietnameseName">
              Vietnamese Name <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="vietnameseName"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="vietnameseName"
                    placeholder="Ex: Hệ thống quản lý đồ án cho giảng viên và sinh viên của trường đại học FPT"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="abbreviations">
              Abbreviations <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="abbreviation"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="abbreviations"
                    placeholder="Ex: FUC"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Textarea
                    id="description"
                    placeholder="Type description for topic here."
                    className="w-full min-h-[90px]"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="difficulty">
              Difficulty Level <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty level" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="businessArea">
              Business Area <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="businessArea"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business area" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessAreas.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="file">
              File <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="file"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files ? e.target.files[0] : null);
                      field.onChange(e.target.files ? e.target.files[0] : null);
                    }}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="supervisor2">Supervisor 2</Label>
            <Controller
              name="coSupervisorEmails"
              control={control}
              render={({ field }) => (
                <Input
                  id="supervisor2"
                  placeholder="Ex: SangNM"
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          variant={"outline"}
          className="h-12 border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Download />
          Template
        </Button>
        <Button type="submit" className="h-12 flex items-center">
          {isLoading ? <Loader2 className="animate-spin" /> : <Send className="mr-2" />}
          Register
        </Button>
      </CardFooter>
    </form>
  );
};

export default RegisterTopicForm;