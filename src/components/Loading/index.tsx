import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  loading: boolean;
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ loading, children }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ opacity: loading ? 0.4 : 1 }}>{children}</Box>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}>
          <CircularProgress />
          <Typography sx={{ mt: 3, color: "#fff" }}>Loading...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Loading;
