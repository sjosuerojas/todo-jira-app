import { Task, TaskState } from "@/models";

type TaskActionType =
  | { type: "[Task] | Create Task"; payload: Task }
  | { type: "[Task] | Update Task"; payload: Task }
  | { type: "[Task] | Dragging Task"; payload: boolean }
  | { type: "[Task] | List Tasks"; payload: Task[] };

export const taskReducer = (
  state: TaskState,
  action: TaskActionType
): TaskState => {
  switch (action.type) {
    case "[Task] | List Tasks":
      return { ...state, tasks: [...action.payload] };
    case "[Task] | Create Task":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "[Task] | Update Task":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          return task._id === action.payload._id ? action.payload : task;
        }),
      };
    case "[Task] | Dragging Task":
      return { ...state, isDragging: action.payload };
    default:
      return state;
  }
};
