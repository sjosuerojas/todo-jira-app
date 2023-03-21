import { createContext } from "react";
import type { Task } from "@/models";

interface ContextProps {
  tasks: Task[];
  isDragging: boolean;
  addNewTask: (description: string) => void;
  updateTask: (task: Task) => void;
  isDraggingHandler: (isDragging: boolean) => void;
}

export const TaskContext = createContext({} as ContextProps);
