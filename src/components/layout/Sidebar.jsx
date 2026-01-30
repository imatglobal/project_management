import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/app/gateway" },
  { text: "Projects", icon: <FolderIcon />, path: "/app/projects" },
  { text: "Kanban Board", icon: <ViewKanbanIcon />, path: "/app/kanban" },
  { text: "Backlog", icon: <AssignmentIcon />, path: "/app/backlog" },
  { text: "Teams", icon: <GroupsIcon />, path: "/app/teams" },
  { text: "Settings", icon: <SettingsIcon />, path: "/app/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
          background: "rgba(13, 17, 28, 0.85)",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "4px 0 30px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        {/* Branding removed as requested */}
      </Box>

      {/* Divider removed */}

      <List sx={{ px: 2, mt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: "12px",
                position: "relative",
                transition: "all 0.3s ease",
                background: isActive
                  ? "linear-gradient(90deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)"
                  : "transparent",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "4px",
                  height: isActive ? "24px" : "0px",
                  backgroundColor: "#00d4ff",
                  borderRadius: "0 4px 4px 0",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isActive ? "0 0 10px #00d4ff" : "none",
                },
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.03)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "#00d4ff" : "#94a3b8",
                  minWidth: 42,
                  display: "flex",
                  justifyContent: "center",
                  transition: "color 0.3s ease",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#fff" : "#94a3b8",
                  letterSpacing: "0.02em",
                  transition: "color 0.3s ease",
                }}
                sx={{ m: 0 }}
              />
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: "16px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Avatar
              src="/broken-image.jpg"
              sx={{ width: 36, height: 36, border: "2px solid #00d4ff" }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "#fff", fontWeight: 600 }}
              >
                Alkor User
              </Typography>
              <Typography variant="caption" sx={{ color: "#a0aec0" }}>
                Product Owner
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            sx={{
              width: "100%",
              borderRadius: "8px",
              mt: 1,
              color: "#a0aec0",
              "&:hover": {
                color: "#ff5b5b",
                background: "rgba(255, 91, 91, 0.1)",
              },
            }}
          >
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
