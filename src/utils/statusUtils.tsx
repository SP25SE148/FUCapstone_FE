import { Badge } from "@/components/ui/badge";

//#region Student Status

export function getStudentStatus(status: string) {
    switch (status) {
        case "InProgress":
            return (
                <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
                    In Progress
                </Badge>
            );
        case "Completed":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    Completed
                </Badge>
            );
        case "InCompleted":
            return (
                <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>
                    Incompleted
                </Badge>
            );
        default:
            return null;
    }
}

//#endregion

//#region Group Status

export function getGroupStatus(status: string) {
    switch (status) {
        case "Pending":
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    Pending
                </Badge>
            );
        case "InProgress":
            return (
                <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
                    In Progress
                </Badge>
            );
        case "Completed":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    Completed
                </Badge>
            );
        case "InCompleted":
            return (
                <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>
                    Incompleted
                </Badge>
            );
        case "Deleted":
            return (
                <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
                    Deleted
                </Badge>
            );
        default:
            return null;
    }
}

export function getGroupMemberStatus(status: string) {
    switch (status) {
        case "UnderReview":
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    Under Review
                </Badge>
            );
        case "Accepted":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    Accepted
                </Badge>
            );
        case "Rejected":
            return (
                <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>
                    Rejected
                </Badge>
            );
        case "LeftGroup":
            return (
                <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
                    Left Group
                </Badge>
            );
        case "Cancelled":
            return (
                <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>
                    Cancelled
                </Badge>
            );
        default:
            return null;
    }
}

export function getJoinGroupStatus(status: string) {
    switch (status) {
        case "Pending":
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Approved":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Rejected":
            return (
                <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Cancelled":
            return (
                <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>
                    Cancelled
                </Badge>
            );
        default:
            return null;
    }
}

//#endregion

//#region Topic Status

export function getTopicStatus(status: string) {
    switch (status) {
        case "Pending":
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Approved":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Considered":
            return (
                <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Rejected":
            return (
                <Badge style={{ backgroundColor: "#ef4444", color: "white" }}>
                    {status}
                </Badge>
            );
        default:
            return null;
    }
}

export function getTopicDifficulty(status: string) {
    switch (status) {
        case "Easy":
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    {status}
                </Badge>
            )
        case "Medium":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    {status}
                </Badge>
            )
        case "Hard":
            return (
                <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
                    {status}
                </Badge>
            )
        default:
            return null;
    }
}

export function getTopicAppraisalStatus(status: string) {
    switch (status) {
        case "Pending":
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Accepted":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Considered":
            return (
                <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Rejected":
            return (
                <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
                    {status}
                </Badge>
            );
        default:
            return null;
    }
}

export function getTopicRequestStatus(status: string) {
    switch (status) {
        case "UnderReview":
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    Under Review
                </Badge>
            );
        case "Rejected":
            return (
                <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
                    {status}
                </Badge>
            );
        case "Accepted":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    {status}
                </Badge>
            );
        default:
            return null;
    }
}

//#endregion

//#region Project Progress Status

export function getProjectProgressWeekStatus(status: number) {
    switch (status) {
        case 1:
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    To do
                </Badge>
            );
        case 0:
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    Done
                </Badge>
            );
        default:
            return null;
    }
}

//#endregion

//#region Review Status

export function getReviewCalendarStatus(status: string) {
    switch (status) {
        case "Pending":
            return (
                <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
                    Pending
                </Badge>
            );
        case "InProgress":
            return (
                <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
                    In Progress
                </Badge>
            );
        case "Done":
            return (
                <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
                    Done
                </Badge>
            );
        default:
            return null;
    }
}

//#endregion