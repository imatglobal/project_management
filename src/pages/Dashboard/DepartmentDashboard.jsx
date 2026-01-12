import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Drawer,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
} from "@mui/material";
import { GlassContainer } from "../../components/common/GlassComp";
import { useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import ProjectBoard from "../../components/dashboard/ProjectBoard";
import axios from "axios";

// Mock Data Generators
const getDeptTitle = (id) => {
  const titles = {
    it: "IT Department Workspace",
    marketing: "Marketing Command Center",
  };
  return titles[id] || "Department Workspace";
};

const drawerWidth = 280;

const DepartmentDashboard = () => {
  const { deptId } = useParams();
  const title = getDeptTitle(deptId);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("assigned"); // 'assigned', 'todo', 'kanban'

  // ---------------------------------------------------------------------------
  // AUTHORIZATION CHECK PLACEHOLDER
  // ---------------------------------------------------------------------------
  /*
  useEffect(() => {
    // TODO: Implement Authorization Check
    // 1. Get token from localStorage/sessionStorage containing user info & department
    //    const token = localStorage.getItem('authToken');
    
    // 2. Decode JWT to verify user matches the requested department (deptId)
    //    if (!token || !isValid(token) || user.department !== deptId) {
    //       redirect('/login');
    //    }

    // 3. Fetch user-specific data using the token
  }, []);
  */
  // ---------------------------------------------------------------------------

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mock Data
  const [todos, setTodos] = useState([]);

  const toggleTodo = (index) => {
    setTodos(todos.map((t, i) => (i === index ? { ...t, done: !t.done } : t)));
  };

  const [assignedTasks, setAssignedTasks] = useState([]);
  const [kanbanTasks, setKanbanTasks] = useState([]);

  // Kanban State (filtered for this employee)
  useEffect(() => {
    try {
      async function fetchtasks() {
        let tasks = await axios.get(
          "http://localhost:8080/admin/get_kanban_task"
        );
        const task_data = tasks.data;
        console.log(task_data);
        setAssignedTasks(task_data);
        setKanbanTasks(task_data);
        setTodos(task_data);
      }
      fetchtasks();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const menuItems = [
    { id: "assigned", label: "Assigned Tasks", icon: <AssignmentIcon /> },
    { id: "todo", label: "My To-Do List", icon: <ListAltIcon /> },
    { id: "kanban", label: "My Kanban Board", icon: <ViewKanbanIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ p: 2, height: "100%", bgcolor: "rgba(10, 14, 23, 0.95)" }}>
      <Box sx={{ mb: 4, px: 2, pt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff" }}>
          EMPLOYEE PANEL
        </Typography>
        <Typography variant="caption" sx={{ color: "#a0aec0" }}>
          {title}
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              mb: 1,
              borderRadius: "12px",
              bgcolor:
                activeTab === item.id
                  ? "rgba(0, 212, 255, 0.15)"
                  : "transparent",
              color: activeTab === item.id ? "#00d4ff" : "#a0aec0",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: activeTab === item.id ? "#00d4ff" : "#a0aec0",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
        <GlassContainer
          sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#00d4ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon sx={{ color: "#fff" }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: "#fff" }}
            >
              Alkor
            </Typography>
            <Typography variant="caption" sx={{ color: "#a0aec0" }}>
              Employee
            </Typography>
          </Box>
        </GlassContainer>
      </Box>
    </Box>
  ); // side bar

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            background: "rgba(10, 14, 23, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "none",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {menuItems.find((i) => i.id === activeTab)?.label}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid rgba(255,255,255,0.1)",
              background: "#0a0e17",
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              position: "relative",
              height: "100vh",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 1 }}>
          {menuItems.find((i) => i.id === activeTab)?.label}
        </Typography>
        <Typography variant="body1" sx={{ color: "#a0aec0", mb: 4 }}>
          Manage your daily workflow efficiently.
        </Typography>

        {/* VIEW: ASSIGNED TASKS */}
        {activeTab === "assigned" && (
          <Grid container spacing={3}>
            {assignedTasks.map((task, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <GlassContainer
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 2,
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        mb: 1,
                      }}
                    >
                      <Chip
                        label={task.priority}
                        size="small"
                        sx={{
                          bgcolor:
                            task.priority === "Critical"
                              ? "rgba(255, 68, 68, 0.2)"
                              : "rgba(0, 212, 255, 0.1)",
                          color:
                            task.priority === "Critical"
                              ? "#ff4444"
                              : "#00d4ff",
                          fontWeight: 600,
                          height: 24,
                        }}
                      />
                      {task.status === "completed" && (
                        <CheckCircleOutlineIcon
                          sx={{ color: "#00e676", fontSize: 20 }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#fff",
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#a0aec0",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {task.desc}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      pt: 2,
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      label={task.status.replace("_", " ")}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.05)",
                        color: "#a0aec0",
                        fontSize: "0.75rem",
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "#718096" }}>
                      Deadline: {task.deadline}
                    </Typography>
                  </Box>
                </GlassContainer>
              </Grid>
            ))}
          </Grid>
        )}

        {/* VIEW: MY TO-DO LIST */}
        {/* VIEW: MY TO-DO LIST */}
        {activeTab === "todo" && (
          <Box sx={{ maxWidth: 800, mx: "auto", width: "100%" }}>
            <GlassContainer sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: "#fff", mb: 1 }}
                  >
                    My Daily Goals
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#a0aec0" }}>
                    Track your personal progress and small wins.
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="h4"
                    sx={{ color: "#00d4ff", fontWeight: 700 }}
                  >
                    {Math.round(
                      (todos.filter((t) => t.done).length / todos.length) * 100
                    )}
                    %
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#a0aec0" }}>
                    Completed
                  </Typography>
                </Box>
              </Box>

              {/* Progress Bar */}
              <Box
                sx={{
                  mb: 4,
                  bgcolor: "rgba(255,255,255,0.05)",
                  height: 8,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${
                      (todos.filter((t) => t.done).length / todos.length) * 100
                    }%`,
                    height: "100%",
                    bgcolor: "#00d4ff",
                    transition: "width 0.5s ease",
                  }}
                />
              </Box>

              <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {todos.map((todo, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => toggleTodo(index)}
                    sx={{
                      borderRadius: "16px",
                      border: "1px solid",
                      borderColor: todo.done
                        ? "rgba(0, 230, 118, 0.3)"
                        : "rgba(255,255,255,0.05)",
                      bgcolor: todo.done
                        ? "rgba(0, 230, 118, 0.05)"
                        : "rgba(255,255,255,0.02)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateX(5px)",
                        bgcolor: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(0, 212, 255, 0.5)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 50 }}>
                      {todo.done ? (
                        <CheckCircleOutlineIcon
                          sx={{ color: "#00e676", fontSize: 28 }}
                        />
                      ) : (
                        <RadioButtonUncheckedIcon
                          sx={{ color: "#a0aec0", fontSize: 28 }}
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={todo.title}
                      primaryTypographyProps={{
                        variant: "h6",
                        style: {
                          textDecoration: todo.done ? "line-through" : "none",
                          color: todo.done ? "#718096" : "#fff",
                          fontWeight: 500,
                        },
                      }}
                    />
                    {todo.done && (
                      <Chip
                        label="Done"
                        size="small"
                        sx={{
                          bgcolor: "rgba(0, 230, 118, 0.2)",
                          color: "#00e676",
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </GlassContainer>
          </Box>
        )}

        {/* VIEW: KANBAN BOARD */}
        {activeTab === "kanban" && (
          <Box sx={{ height: "calc(100vh - 200px)", width: "100%" }}>
            {/* Reusing the ProjectBoard component which utilizes DragDropContext */}
            {/* Note: ProjectBoard expects 'tasks' and 'setTasks' */}
            <ProjectBoard tasks={kanbanTasks} setTasks={setKanbanTasks} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DepartmentDashboard;
