import { useRouter } from "next/router";
import { useContext } from "react";
import type { DragEvent } from "react";
import type { Task } from "@/models";
import { TaskContext } from "@/context/tasks/TaskContext";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const TaskItem: React.FC<Task> = ({ _id, description, createdAt }) => {
  const { isDraggingHandler } = useContext(TaskContext);
  const router = useRouter();

  const onDragEnd = () => isDraggingHandler(false);
  const onDragStart = (event: DragEvent<HTMLElement>) => {
    event.dataTransfer.setData("text", _id);
    isDraggingHandler(true);
  };

  return (
    <Box my={2}>
      <Card
        draggable
        onClick={() => router.push(`/tasks/${_id}`)}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <CardActionArea>
          <CardContent>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {description}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="body2">
              Last updated {new Date(createdAt).toLocaleTimeString()}
            </Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default TaskItem;
