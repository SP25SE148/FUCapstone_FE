"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
import { CardContent } from "@/components/ui/card";
import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-management";

const difficulties = ["Easy", "Medium", "Hard"];

const RegisterTopicForm: React.FC = () => {
  const { businessAreas } = useSupervisorTopic();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [businessArea, setBusinessArea] = useState<string>("");

  return (
    <CardContent className="p-8 pt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="capstone">Capstone</Label>
          <Input id="capstone" placeholder="Ex: SEP490" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="englishName">English Name</Label>
          <Input
            id="englishName"
            placeholder="Ex: Capstone management system for FPT university teachers and students"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="vietnameseName">Vietnamese Name</Label>
          <Input
            id="vietnameseName"
            placeholder="Ex: Hệ thống quản lý đồ án cho giảng viên và sinh viên của trường đại học FPT"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="abbreviations">Abbreviations</Label>
          <Input id="abbreviations" placeholder="Ex: FUC" />
        </div>
        <div className="space-y-1 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type description for topic here."
            className="w-full min-h-[90px]"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select onValueChange={setSelectedDifficulty}>
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
        </div>
        <div className="space-y-1">
          <Label htmlFor="businessArea">Business Area</Label>
          <Select value={businessArea} onValueChange={setBusinessArea}>
            <SelectTrigger>
              <SelectValue placeholder="Select business area" />
            </SelectTrigger>
            <SelectContent>
              {businessAreas.map((area) => (
                <SelectItem key={area.id} value={area.name}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="file">File</Label>
          <Input id="file" type="file" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="supervisor2">Supervisor 2</Label>
          <Input id="supervisor2" placeholder="Ex: SangNM" />
        </div>
      </div>
    </CardContent>
  );
};

export default RegisterTopicForm;
