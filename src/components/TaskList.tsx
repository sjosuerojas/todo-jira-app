import { useContext, useMemo, DragEvent } from "react";
import { Paper, PaperProps, List } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TaskContext } from "@/context/tasks/TaskContext";
import TaskItem from "./TaskItem";
import type { Task, Status } from "@/models";

const TaskPaper = styled(Paper)<PaperProps>(() => ({
  height: "calc(100vh - 250px)",
  overflow: "scroll",
  backgroundColor: "transparent",
  padding: "5px 12px",
}));

interface Props {
  status: Status;
}

const TaskList: React.FC<Props> = ({ status }) => {
  const { tasks, isDragging, updateTask, isDraggingHandler } =
    useContext(TaskContext);

  const taskByStatus = useMemo(
    () => tasks.filter((task) => task.status === status),
    [status, tasks]
  );

  const onDragOverHandler = (event: DragEvent<HTMLElement>) =>
    event.preventDefault();

  const onDropHandler = (event: DragEvent<HTMLElement>) => {
    const taskId = event.dataTransfer.getData("text");

    const taskById: Task = tasks.find((task) => task._id === taskId)!;
    taskById.status = status;
    updateTask(taskById);

    isDraggingHandler(false);
  };

  return (
    <div onDrop={onDropHandler} onDragOver={onDragOverHandler}>
      <TaskPaper>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {taskByStatus.map((task) => (
            <TaskItem key={task._id} {...task} />
          ))}
        </List>
      </TaskPaper>
    </div>
  );
};

export default TaskList;
