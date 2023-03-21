import { useEffect, useReducer } from "react";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./reducers";
import type { Task, TaskState } from "@/models";
import type { PropsWithChildren } from "react";

const TASK_INITIAL_STATE: TaskState = {
  tasks: [],
  isDragging: false,
};

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, TASK_INITIAL_STATE);

  const addNewTask = async (description: string) => {
    try {
      const req = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await req.json();
      dispatch({ type: "[Task] | Create Task", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const res = await fetch(`/api/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await res.json();
      dispatch({ type: "[Task] | Update Task", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const listTasks = async () => {
    try {
      const req = await fetch("/api/task");
      const { data } = await req.json();
      dispatch({ type: "[Task] | List Tasks", payload: data as Task[] });
    } catch (error) {
      console.error(error);
    }
  };

  const isDraggingHandler = (isDragging: boolean) =>
    dispatch({ type: "[Task] | Dragging Task", payload: isDragging });

  useEffect(() => {
    listTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ ...state, addNewTask, updateTask, isDraggingHandler }}
    >
      {children}
    </TaskContext.Provider>
  );
};
