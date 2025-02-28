"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Folder } from "lucide-react";

import { cn } from "@/lib/utils";
import ItemFile from "./item-file";

// Định nghĩa kiểu dữ liệu
interface FolderItem {
    name: string;
    children?: FolderItem[] | null;
}

export default function ItemSubfolder({ item }: { item: FolderItem }) {
    const [showSubFile, setShowSubFile] = useState(false);

    return (
        <div>
            <div
                className={cn(
                    "p-2 rounded-lg bg-primary text-background text-sm transition-all flex items-center justify-between cursor-pointer",
                    showSubFile && "rounded-b-none"
                )}
                onClick={() => setShowSubFile(!showSubFile)}
            >
                <div className="flex items-center gap-2">
                    <Folder className="size-4" />
                    {item?.name}
                </div>
                {showSubFile ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </div>
            {showSubFile && item.children && (
                <div className="p-2 pl-6 border border-primary rounded-b-lg bg-muted space-y-2">
                    {item.children.map((file, index) => (
                        <ItemFile key={index} file={file} />
                    ))}
                </div>
            )}
        </div>
    );
}
