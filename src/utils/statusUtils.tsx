import { Badge } from "@/components/ui/badge";

export function getStudentStatus(status: string) {
    switch (status) {
        case "InProgress":
            return (
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    In Progress
                </Badge>
            );
        case "Completed":
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Completed
                </Badge>
            );
        case "InCompleted":
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                    Incompleted
                </Badge>
            );
        default:
            return null;
    }
}