export type Status = "Pending" | "InProgress" | "Done";

export interface Task {
  _id: string;
  description: string;
  createdAt: number;
  status: Status;
}

export interface TaskState {
  tasks: Task[];
  isDragging: boolean;
}

export interface UIState {
  isOpenSnackbar: boolean;
}
