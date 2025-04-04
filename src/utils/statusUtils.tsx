import { Badge } from "@/components/ui/badge";

//#region Student Status

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

//#endregion

//#region Group Status

export function getGroupStatus(status: string) {
    switch (status) {
        case "Pending":
            return (
                <Badge variant="secondary" className="text-sm select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    Pending
                </Badge>
            );
        case "InProgress":
            return (
                <Badge variant="secondary" className="text-sm select-none bg-sky-200 text-sky-800 hover:bg-sky-200">
                    In Progress
                </Badge>
            );
        case "Completed":
            return (
                <Badge variant="secondary" className="text-sm select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Completed
                </Badge>
            );
        case "InCompleted":
            return (
                <Badge variant="secondary" className="text-sm select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    Incompleted
                </Badge>
            );
        case "Deleted":
            return (
                <Badge variant="secondary" className="text-sm select-none bg-red-200 text-red-800 hover:bg-red-200">
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
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    Under Review
                </Badge>
            );
        case "Accepted":
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Accepted
                </Badge>
            );
        case "Rejected":
            return (
                <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    Rejected
                </Badge>
            );
        case "LeftGroup":
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                    Left Group
                </Badge>
            );
        case "Cancelled":
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
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
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {status}
                </Badge>
            );
        case "Approved":
            return (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {status}
                </Badge>
            );
        case "Rejected":
            return (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {status}
                </Badge>
            );
        case "Cancelled":
            return (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
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
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    {status}
                </Badge>
            );
        case "Approved":
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    {status}
                </Badge>
            );
        case "Considered":
            return (
                <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    {status}
                </Badge>
            );
        case "Rejected":
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
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
                <Badge variant="secondary" className="select-none bg-blue-400 text-blue-800 hover:bg-blue-400">
                    {status}
                </Badge>
            )
        case "Medium":
            return (
                <Badge variant="secondary" className="select-none bg-green-400 text-green-800 hover:bg-green-400">
                    {status}
                </Badge>
            )
        case "Hard":
            return (
                <Badge variant="secondary" className="select-none bg-red-400 text-red-800 hover:bg-red-400">
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
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    {status}
                </Badge>
            );
        case "Accepted":
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    {status}
                </Badge>
            );
        case "Considered":
            return (
                <Badge variant="secondary" className="select-none bg-rose-200 text-rose-800 hover:bg-rose-200">
                    {status}
                </Badge>
            );
        case "Rejected":
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
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
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    Under Review
                </Badge>
            );
        case "Rejected":
            return (
                <Badge variant="secondary" className="select-none bg-red-200 text-red-800 hover:bg-red-200">
                    {status}
                </Badge>
            );
        case "Accepted":
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
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
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    To do
                </Badge>
            );
        case 0:
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
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
                <Badge variant="secondary" className="text-sm select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    Pending
                </Badge>
            );
        case "InProgress":
            return (
                <Badge variant="secondary" className="text-sm select-none bg-blue-400 text-white hover:bg-blue-400">
                    In Progress
                </Badge>
            );
        case "Done":
            return (
                <Badge variant="secondary" className="text-sm select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Done
                </Badge>
            );
        default:
            return null;
    }
}

//#endregion