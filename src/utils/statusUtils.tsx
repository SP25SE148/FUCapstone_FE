import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

//#region Campus Status

export function getCampusStatus(status: boolean) {
  switch (status) {
    case true:
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          Inactive
        </Badge>
      );
    case false:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          Active
        </Badge>
      );
    default:
      return null;
  }
}

//#endregion

//#region Semester Status

export function getSemesterStatus(status: boolean) {
  switch (status) {
    case true:
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          Deleted
        </Badge>
      );
    case false:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          Active
        </Badge>
      );
    default:
      return null;
  }
}

//#endregion

//#region Major Status

export function getMajorGroupStatus(status: boolean) {
  switch (status) {
    case true:
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          Inactive
        </Badge>
      );
    case false:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          Active
        </Badge>
      );
    default:
      return null;
  }
}

export function getMajorStatus(status: boolean) {
  switch (status) {
    case true:
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          Inactive
        </Badge>
      );
    case false:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          Active
        </Badge>
      );
    default:
      return null;
  }
}

//#endregion

//#region Capstone Status

export function getCapstoneStatus(status: boolean) {
  switch (status) {
    case true:
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          Inactive
        </Badge>
      );
    case false:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          Active
        </Badge>
      );
    default:
      return null;
  }
}

//#endregion

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
      );
    case "Medium":
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          {status}
        </Badge>
      );
    case "Hard":
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          {status}
        </Badge>
      );
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

export function getTopicAppraisalStatus2(status: number) {
  switch (status) {
    case 0:
      return (
        <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
          {"Pending"}
        </Badge>
      );
    case 1:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          {"Accepted"}
        </Badge>
      );
    case 2:
      return (
        <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
          {"Considered"}
        </Badge>
      );
    case 3:
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          {"Rejected"}
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

//#region Task Status

export function getTaskStatus(status: number) {
  switch (status) {
    case 0:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          Done
        </Badge>
      );
    case 1:
      return (
        <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
          In Progress
        </Badge>
      );
    case 2:
      return (
        <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
          To Do
        </Badge>
      );
    default:
      return null;
  }
}

export function getPriorityStatus(status: number) {
  switch (status) {
    case 0:
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          High
        </Badge>
      );
    case 1:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          Medium
        </Badge>
      );
    case 2:
      return (
        <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
          Low
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

//#region Review Status

export function getDefenseCalendarStatus(status: string) {
  switch (status) {
    case "NotStarted":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 font-medium"
        >
          Not Started
        </Badge>
      );
    case "InProgress":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
        >
          In Progress
        </Badge>
      );
    case "Done":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 font-medium"
        >
          Done
        </Badge>
      );
    default:
      return null;
  }
}

//#endregion

//#region Decision Status

export function getDecisionStatus(status: string) {
  switch (status) {
    case "Disagree_to_defense":
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          Disagree to defense
        </Badge>
      );
    case "Agree_to_defense":
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          Agree to defense
        </Badge>
      );
    case "Revised_for_the_second_defense":
      return (
        <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
          Revised for the second defense
        </Badge>
      );
    default:
      return null;
  }
}

//#endregion

//#region Defense Status

export function getDefenseStatus(status: string) {
  switch (status) {
    case "NotStarted":
      return (
        <Badge style={{ backgroundColor: "#60a5fa", color: "white" }}>
          Not Started
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

export function getReDefenseStatus(status: boolean) {
  switch (status) {
    case true:
      return (
        <Badge style={{ backgroundColor: "#dc2626", color: "white" }}>
          <CheckCircle className="size-5 mr-2" />Need redefend
        </Badge>
      );
    case false:
      return (
        <Badge style={{ backgroundColor: "#16a34a", color: "white" }}>
          <XCircle className="size-5 mr-2" />No need
        </Badge>
      );
    default:
      return null;
  }
}

//#endregion
