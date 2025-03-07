import ItemFolderFile from "./item-folder-file";
import { Template } from "@/contexts/superadmin/superadmin-template-context";

export default function ListFolderFile({ list }: { list: Template[] }) {
    return (
        <div className="border rounded-md space-y-2">
            <div className="grid grid-cols-7 gap-2 p-2 rounded-t-md bg-primary text-background font-medium text-sm">
                <div className="col-span-3">Name</div>
                <div className="text-right">Date modified</div>
                <div className="text-right">Type</div>
                <div className="text-center">Active</div>
                <div className="text-center">Action(s)</div>
            </div>
            <div className="space-y-2">
                {list?.map((item, index) => (
                    <ItemFolderFile key={index} item={item} />
                ))}
            </div>
        </div>
    );
}
