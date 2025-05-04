import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Header.module.css";

interface HeaderProps {
  onAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdd }) => (
  <Box className={styles.headerRoot}>
    <Box className={styles.headerBox}>
      <ListAltIcon sx={{ color: "#fff", fontSize: 28 }} />
      <Typography variant='h6' className={styles.headerTitle}>
        All my tasks
      </Typography>
    </Box>
    <IconButton className={styles.headerIconBtn} onClick={onAdd}>
      <AddIcon sx={{ fontSize: 28 }} />
    </IconButton>
  </Box>
);

export default Header;
