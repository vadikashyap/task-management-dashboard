import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface DeleteWarningModalProps {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
  message?: string;
}

const DeleteWarningModal: React.FC<DeleteWarningModalProps> = ({
  open,
  onCancel,
  onDelete,
  message = "Do you really want to delete these records? This process cannot be undone.",
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth='xs' fullWidth>
      <IconButton
        aria-label='close'
        onClick={onCancel}
        sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}>
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ textAlign: "center", pt: 5, pb: 4 }}>
        <Box display='flex' justifyContent='center' alignItems='center' mb={2}>
          <HighlightOffIcon sx={{ fontSize: 64, color: "#ff3366" }} />
        </Box>
        <Typography variant='h5' fontWeight={500} mb={1}>
          Are you sure?
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={3}>
          {message}
        </Typography>
        <Box display='flex' justifyContent='center' gap={2}>
          <Button
            variant='contained'
            onClick={onCancel}
            sx={{
              bgcolor: "grey.300",
              color: "grey.700",
              boxShadow: "none",
              "&:hover": { bgcolor: "grey.400" },
            }}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={onDelete}
            sx={{
              bgcolor: "#ff3366",
              color: "#fff",
              boxShadow: "none",
              "&:hover": { bgcolor: "#e6004c" },
            }}>
            Delete
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarningModal;
