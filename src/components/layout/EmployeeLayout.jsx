import React from "react";
import { Box, useTheme, useMediaQuery, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = 260;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Sidebar />
      </Box>

      {/* Main Content Wrapper */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { md: `calc(100% - ${drawerWidth}px)` },
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Top Header */}
        <Topbar />

        {/* Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            overflowX: "hidden",
            background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.dark}15 0%, transparent 50%)`,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeLayout;
