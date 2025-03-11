export interface Task {
  id: string;
  keyTask: string;
  description: string;
  summary: string;
  assignee: string;
  status: string;
  priority: string;
  dueDate: string;
}

export const tasks: Task[] = [
  {
    id: "1",
    keyTask: "TASK-1",
    description: "Description for Task 1",
    summary: "Summary for Task 1",
    assignee: "Student 1",
    status: "Todo",
    priority: "Medium",
    dueDate: "2025-03-15",
  },
  {
    id: "2",
    keyTask: "TASK-2",
    description: "Description for Task 2",
    summary: "Summary for Task 2",
    assignee: "Student 2",
    status: "Inprocess",
    priority: "High",
    dueDate: "2025-03-20",
  },
  {
    id: "3",
    keyTask: "TASK-3",
    description: "Description for Task 3",
    summary: "Summary for Task 3",
    assignee: "",
    status: "Unassigned",
    priority: "Low",
    dueDate: "2025-03-25",
  },
  {
    id: "4",
    keyTask: "TASK-4",
    description: "Description for Task 4",
    summary: "Summary for Task 4",
    assignee: "Student 3",
    status: "Done",
    priority: "Medium",
    dueDate: "2025-03-30",
  },
];