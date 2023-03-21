import { Card, CardHeader, Grid } from "@mui/material";
import TaskList from "@/components/TaskList";
import NewTask from "./NewTask";
import type { Status } from "@/models";

const statusList: Status[] = ["Pending", "InProgress", "Done"];

const TaskContainer: React.FC = () => {
  return (
    <>
      {statusList.map((status, idx) => (
        <Grid key={`${idx}${status}`} item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title={status} />

            {status === "Pending" && <NewTask />}
            <TaskList status={status} />
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default TaskContainer;
