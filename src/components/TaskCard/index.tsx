import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../../store/modules/task/types";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../store/modules/task/actions";
import styles from "./TaskCard.module.css";
import DeleteWarningModal from "../DeleteWarningModal";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(task);
    handleMenuClose();
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleCancelDelete = () => setDeleteModalOpen(false);
  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id));
    setDeleteModalOpen(false);
  };

  return (
    <Card className={styles.taskCard}>
      <CardContent className={styles.taskCardContent}>
        <Box className={styles.taskCardHeader}>
          <Typography
            variant='h6'
            component='div'
            className={styles.taskCardTitle}>
            {task.title}
          </Typography>
          <IconButton
            size='small'
            onClick={handleMenuOpen}
            className={styles.taskCardMenuBtn}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                bgcolor: "#252525",
                color: "#fff",
                minWidth: 140,
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.3)",
              },
            }}>
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon sx={{ color: "#bdbdbd" }} />
              </ListItemIcon>
              <ListItemText primary='Edit' />
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon sx={{ color: "#bdbdbd" }} />
              </ListItemIcon>
              <ListItemText primary='Delete' />
            </MenuItem>
          </Menu>
        </Box>
        {task.description && (
          <Typography variant='body2' className={styles.taskCardDesc}>
            {task.description}
          </Typography>
        )}
      </CardContent>
      <DeleteWarningModal
        open={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onDelete={handleConfirmDelete}
        message='Do you really want to delete this task? This process cannot be undone.'
      />
    </Card>
  );
};

export default TaskCard;
