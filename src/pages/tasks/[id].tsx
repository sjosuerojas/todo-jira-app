import { ChangeEvent, useState, useMemo, useContext } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import type { Task, Status } from "@/models";
import mongoose from "mongoose";
import { db } from "@/database";
import TaskModel from "@/database/task.model";
import { enqueueSnackbar } from "notistack";
import { TaskContext } from "@/context/tasks/TaskContext";
import {
  Box,
  Card,
  Grid,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Layout from "@/components/shared/Layout";

interface Props {
  task: Task;
}

const statusList: Status[] = ["Pending", "InProgress", "Done"];

export default function TaskById({ task }: Props) {
  const { updateTask } = useContext(TaskContext);
  const router = useRouter();

  const [taskInput, setTaskInput] = useState<string>(task.description);
  const [touched, setTouched] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>(task.status);

  const isTouched = useMemo(
    () => taskInput.length <= 0 && touched,
    [taskInput, touched]
  );

  const handleChangeTask = (event: ChangeEvent<HTMLInputElement>) =>
    setTaskInput(event.target.value);

  const handleChangeStatus = (event: ChangeEvent<HTMLInputElement>) =>
    setStatus(event.target.value as Status);

  const handleSave = () => {
    updateTask({ ...task, description: taskInput, status });

    enqueueSnackbar("Successfully updated", {
      autoHideDuration: 3000,
      variant: "success",
    });

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <Layout title="Task Details">
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={8} md={3}>
          <Card>
            <CardHeader
              title="Task Details"
              subheader={`Last updated ${new Date(
                task.createdAt
              ).toLocaleTimeString()}`}
            />
            <CardContent>
              <Box>
                <TextField
                  autoFocus
                  multiline
                  fullWidth
                  value={taskInput}
                  onChange={handleChangeTask}
                  onBlur={() => setTouched(true)}
                  error={isTouched}
                  label="Task name"
                  placeholder="Edit Task"
                  helperText={isTouched && "Type something please..."}
                />
              </Box>
              <Box display="center" justifyContent="center" py={3}>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup row value={status} onChange={handleChangeStatus}>
                    {statusList.map((option) => (
                      <FormControlLabel
                        key={option}
                        label={option}
                        value={option}
                        control={<Radio />}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                disabled={isTouched}
                onClick={handleSave}
                startIcon={<SaveAsIcon />}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  if (!mongoose.isValidObjectId(id)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    await db.connect();
    const task = await TaskModel.findById(id).lean();
    const slimTask = JSON.parse(JSON.stringify(task));
    await db.disconnect();

    if (!task) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        task: slimTask,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
