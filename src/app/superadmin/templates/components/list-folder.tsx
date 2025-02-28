import ItemFolder from "./item-folder";
import { useSuperadminTemplate, Template } from "@/contexts/superadmin/superadmin-template-context";

// Định nghĩa kiểu dữ liệu cho thư mục
interface TreeNode {
    name: string;
    children?: TreeNode[] | null;
    id?: string;
    fileUrl?: string;
    isActive?: boolean;
    createdBy?: string;
    createdDate?: string;
}

export default function ListFolder() {
    const { templates } = useSuperadminTemplate();

    const buildTree = (templates: Template[]): TreeNode[] => {
        let tree: TreeNode[] = [];

        templates.forEach(file => {
            let parts = file.fileUrl.split("/"); // Tách đường dẫn thành mảng
            let current: TreeNode[] = tree;

            parts.forEach((part, index) => {
                let existingNode = current.find(node => node.name === part);

                if (!existingNode) {
                    existingNode = {
                        name: part,
                        children: index === parts.length - 1 ? null : []
                    };
                    current.push(existingNode);
                }

                if (index !== parts.length - 1) {
                    if (!existingNode.children) {
                        existingNode.children = [];
                    }
                    current = existingNode.children;
                } else {
                    Object.assign(existingNode, file);
                    delete existingNode.children; // Xóa `children` vì file không có thư mục con
                }
            });
        });

        return tree;
    };

    const tree = buildTree(templates);

    return (
        <div className="space-y-4">
            {tree.map((item, index) => (
                <ItemFolder key={index} item={item} />
            ))}
        </div>
    );
}
