import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../store/modules/task/actions";
import { Task } from "../../store/modules/task/types";
import styles from "./AddTaskModal.module.css";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  taskToEdit?: Task;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  taskToEdit,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "DONE">("TODO");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("TODO");
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (!title) return;
    if (taskToEdit) {
      dispatch(updateTask({ ...taskToEdit, title, description, status }));
    } else {
      dispatch(addTask({ title, description, status }));
    }
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStatus("TODO");
    onClose();
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      className='add-task-modal'
      fullWidth>
      <DialogTitle className={styles.modalDialogTitle}>
        {taskToEdit ? "Edit Task" : "Add New Task"}
      </DialogTitle>
      <DialogContent className={styles.modalDialogContent}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingTop: 16,
          }}>
          <TextField
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            sx={inputSx}
            className={styles.inputField}
            InputLabelProps={{ className: styles.inputLabel }}
          />
          <TextField
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            sx={inputSx}
            className={styles.inputField}
            InputLabelProps={{ className: styles.inputLabel }}
          />
          <TextField
            select
            label='Status'
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "TODO" | "IN_PROGRESS" | "DONE")
            }
            fullWidth
            sx={inputSx}
            className={styles.inputField}
            InputLabelProps={{ className: styles.inputLabel }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: { bgcolor: "#161616" },
                },
              },
            }}>
            <MenuItem value='TODO' className={styles.menuItem}>
              To Do
            </MenuItem>
            <MenuItem value='IN_PROGRESS' className={styles.menuItem}>
              In Progress
            </MenuItem>
            <MenuItem value='DONE' className={styles.menuItem}>
              Done
            </MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions className={styles.modalDialogActions}>
        <Button onClick={handleClose} sx={{ color: "#fff" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={!title}
          className={styles.addTaskBtn}>
          {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
