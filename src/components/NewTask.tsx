import { ChangeEvent, useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import { TaskContext } from "@/context/tasks/TaskContext";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import AddIcon from "@mui/icons-material/Add";

const NewTask: React.FC = () => {
  const { addNewTask } = useContext(TaskContext);

  const [isAddedNewTask, setIsNewTask] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const isTouched = taskInput.length <= 0 && touched;

  const handleChangeTask = (event: ChangeEvent<HTMLInputElement>) =>
    setTaskInput(event.target.value);

  const handleSaveTask = () => {
    if (isTouched) return;
    addNewTask(taskInput);
    resetState();
  };

  const resetState = () => {
    setIsNewTask(false);
    setTaskInput("");
    setTouched(false);
  };

  return (
    <Box mx={2} py={2}>
      {isAddedNewTask ? (
        <>
          <Box py={1}>
            <TextField
              autoFocus
              multiline
              fullWidth
              value={taskInput}
              onChange={handleChangeTask}
              onBlur={() => setTouched(true)}
              error={isTouched}
              label="New"
              placeholder="New Task"
              helperText={isTouched && "Type something please..."}
            />
          </Box>
          <Box py={2} display="flex" justifyContent="space-around">
            <Button
              variant="text"
              color="secondary"
              startIcon={<DoNotDisturbOnIcon />}
              onClick={() => setIsNewTask(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveAsIcon />}
              onClick={handleSaveTask}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => setIsNewTask(true)}
        >
          Add new
        </Button>
      )}
    </Box>
  );
};

export default NewTask;
