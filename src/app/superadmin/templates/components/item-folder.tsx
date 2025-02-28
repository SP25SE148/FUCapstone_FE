"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Folders } from "lucide-react";

import { cn } from "@/lib/utils";
import ListSubfolder from "./list-subfolder";

// Định nghĩa kiểu dữ liệu cho folder
interface FolderItem {
    name: string;
    children?: FolderItem[] | null;
}

export default function ItemFolder({ item }: { item: FolderItem }) {
    const [showSub, setShowSub] = useState(false);

    return (
        <div>
            <div
                className={cn(
                    "p-2 rounded-lg bg-primary text-background transition-all flex items-center justify-between cursor-pointer",
                    showSub && "rounded-b-none"
                )}
                onClick={() => setShowSub(!showSub)}
            >
                <div className="flex items-center gap-2">
                    <Folders className="size-5" />
                    {item?.name}
                </div>
                {showSub ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
            </div>
            {showSub && item.children && (
                <ListSubfolder children={item.children} />
            )}
        </div>
    );
}
