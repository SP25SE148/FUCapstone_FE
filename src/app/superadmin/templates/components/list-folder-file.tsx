import ItemFolderFile from "./item-folder-file";
import { Template} from "@/contexts/superadmin/superadmin-template-context";

export default function ListFolderFile({ list }: { list: Template[] }) {
    return (
        <div className="border rounded-md space-y-2">
            <div className="grid grid-cols-3 gap-2 p-2 rounded-t-md bg-primary text-background font-medium text-sm">
                <div className="col-span-2">Name</div>
                <div>Date modified</div>
            </div>
            <div className="space-y-2">
                {list?.map((item, index) => (
                    <ItemFolderFile key={index} item={item} />
                ))}
            </div>
        </div>
    );
}
