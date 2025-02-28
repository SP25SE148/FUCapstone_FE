"use client";

import ItemSubfolder from "./item-subfolder";

// Định nghĩa kiểu dữ liệu
interface FolderItem {
    name: string;
    children?: FolderItem[] | null;
}

export default function ListSubfolder({ children }: { children: FolderItem[] }) {
    return (
        <div className="p-2 pl-6 rounded-b-lg shadow-lg bg-muted space-y-2">
            {children.map((item, index) => (
                <ItemSubfolder key={index} item={item} />
            ))}
        </div>
    );
}
