import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ErrorBox.module.css";

interface ErrorBoxProps {
  message: string;
  onRetry: () => void;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ message, onRetry }) => {
  return (
    <Box className={styles.errorBoxRoot}>
      <Paper elevation={4} className={styles.errorBoxPaper}>
        <Box className={styles.errorBoxIconWrap}>
          <Box className={styles.errorBoxIconCircle}>
            <CloseIcon sx={{ color: "#fff", fontSize: 32 }} />
          </Box>
          <Typography variant='h6' className={styles.errorBoxTitle}>
            Oops
          </Typography>
        </Box>
        <Typography className={styles.errorBoxMsg}>{message}</Typography>
        <Button
          variant='contained'
          className={styles.errorBoxBtn}
          onClick={onRetry}>
          TRY AGAIN
        </Button>
      </Paper>
    </Box>
  );
};

export default ErrorBox;
