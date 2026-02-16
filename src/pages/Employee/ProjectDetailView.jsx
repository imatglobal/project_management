import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  LinearProgress,
  Checkbox,
  Avatar,
  AvatarGroup,
  IconButton,
  Divider,
  Fade,
  Skeleton,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

const ProjectDetailView = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(projectId);
  let token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const headers = {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        };

        // Fetch both project details and specific tasks for this employee
        const [projectsRes, tasksRes] = await Promise.all([
          axios.get("http://localhost:8080/employee_included_proj", {
            headers,
          }),
          axios.get(`http://localhost:8080/emp_proj-tasks/${projectId}`, {
            headers,
          }),
        ]);

        // Find the specific project this page is for
        const projectMetadata = projectsRes.data.find(
          (p) => p._id === projectId,
        );

        if (projectMetadata) {
          // Flatten the aggregated tasks from backend
          // Structure: [{ employeeTasks: { tasks: { ... } } }, ...]
          const normalizedTasks = tasksRes.data.map((item) => ({
            _id: item.employeeTasks.tasks.task_id,
            ...item.employeeTasks.tasks,
          }));

          setProject({
            ...projectMetadata,
            todos: normalizedTasks,
          });
        } else {
          setProject(null);
        }

        setTimeout(() => {
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error("Error fetching project details:", error);
        setLoading(false);
      }
    };

    if (token && projectId) {
      fetchProjectDetails();
    }
  }, [projectId, token]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "#ff5b5b";
      case "High":
        return "#ffab00";
      case "Medium":
        return "#00d4ff";
      default:
        return "#00e676";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#00e676";
      case "in_progress":
        return "#00d4ff";
      default:
        return "#718096";
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleToggleTodo = (todoId) => {
    // TODO: Implement API call to update todo status
    setProject({
      ...project,
      todos: project.todos.map((todo) =>
        todo._id === todoId
          ? {
              ...todo,
              status: todo.status === "completed" ? "pending" : "completed",
            }
          : todo,
      ),
    });
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 3 }}>
        <Skeleton variant="text" width={200} height={60} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" height={300} sx={{ mb: 3 }} />
        <Skeleton variant="rounded" height={400} />
      </Box>
    );
  }

  if (!project) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" sx={{ color: "#a0aec0" }}>
          Project not found
        </Typography>
      </Box>
    );
  }

  const completedTodos = project.todos
    ? project.todos.filter((t) => t.status === "completed").length
    : 0;
  const totalTodos = project.todos ? project.todos.length : 0;
  const calculatedProgress =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  const daysRemaining = getDaysRemaining(project.deadline);
  const isUrgent = daysRemaining <= 7;

  return (
    <Box sx={{ width: "100%", pb: 4 }}>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/app/projects")}
            sx={{
              mb: 3,
              color: "#a0aec0",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                color: "#00d4ff",
                bgcolor: "rgba(11, 28, 32, 0.1)",
              },
            }}
          >
            Back to Projects
          </Button>

          {/* Project Header */}
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              p: 4,
              mb: 3,
              background: "rgba(20, 25, 40, 0.7)",
              backdropFilter: "blur(16px)",
              borderRadius: "20px",
              border: `1px solid ${isUrgent ? "rgba(255, 171, 0, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Glow */}
            <Box
              sx={{
                position: "absolute",
                top: "-50%",
                right: "-10%",
                width: "400px",
                height: "400px",
                background: `radial-gradient(circle, ${getPriorityColor(project.priority)}15 0%, transparent 70%)`,
                filter: "blur(60px)",
                zIndex: 0,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1 }}>
              {/* Tags */}
              <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
                <Chip
                  label={project.priority}
                  size="small"
                  sx={{
                    bgcolor: `${getPriorityColor(project.priority)}20`,
                    color: getPriorityColor(project.priority),
                    fontWeight: 700,
                    border: `1px solid ${getPriorityColor(project.priority)}40`,
                  }}
                />
                <Chip
                  icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                  label={`${daysRemaining} days remaining`}
                  size="small"
                  sx={{
                    bgcolor: isUrgent
                      ? "rgba(255, 171, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.05)",
                    color: isUrgent ? "#ffab00" : "#a0aec0",
                    fontWeight: 600,
                    border: `1px solid ${isUrgent ? "rgba(255, 171, 0, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                  }}
                />
              </Box>

              {/* Title & Description */}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  mb: 2,
                  letterSpacing: "-0.5px",
                }}
              >
                {project.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#a0aec0",
                  mb: 4,
                  lineHeight: 1.8,
                  maxWidth: "80%",
                }}
              >
                {project.description}
              </Typography>

              {/* Progress Section */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TrendingUpIcon sx={{ color: "#00d4ff", fontSize: 20 }} />
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 700 }}
                    >
                      Overall Progress
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#00d4ff", fontWeight: 700 }}
                  >
                    {calculatedProgress}%
                  </Typography>
                </Box>

                {/* Liquid Progress Bar */}
                <Box
                  sx={{
                    position: "relative",
                    height: 12,
                    borderRadius: 6,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${calculatedProgress}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${getPriorityColor(project.priority)} 0%, ${getPriorityColor(project.priority)}60 100%)`,
                      borderRadius: 6,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Liquid wave effect */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(90deg, transparent, ${getPriorityColor(project.priority)}60, transparent)`,
                        animation: "liquidFlow 2.5s infinite linear",
                        "@keyframes liquidFlow": {
                          "0%": { transform: "translateX(-100%)" },
                          "100%": { transform: "translateX(100%)" },
                        },
                      }}
                    />
                    {/* Bubbles effect */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "20%",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        bgcolor: "rgba(255, 255, 255, 0.4)",
                        animation: "bubble1 3s infinite ease-in-out",
                        "@keyframes bubble1": {
                          "0%, 100%": {
                            transform: "translateY(0) scale(1)",
                            opacity: 0.4,
                          },
                          "50%": {
                            transform: "translateY(-3px) scale(1.2)",
                            opacity: 0.8,
                          },
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "60%",
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        bgcolor: "rgba(255, 255, 255, 0.3)",
                        animation: "bubble2 2.5s infinite ease-in-out",
                        "@keyframes bubble2": {
                          "0%, 100%": {
                            transform: "translateY(0) scale(1)",
                            opacity: 0.3,
                          },
                          "50%": {
                            transform: "translateY(-4px) scale(1.3)",
                            opacity: 0.7,
                          },
                        },
                      }}
                    />
                  </motion.div>
                </Box>

                <Typography
                  variant="caption"
                  sx={{ color: "#a0aec0", mt: 1, display: "block" }}
                >
                  {completedTodos} of {totalTodos} tasks completed
                </Typography>
              </Box>

              {/* Team Members */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#a0aec0", fontWeight: 600 }}
                >
                  Team:
                </Typography>
                <AvatarGroup
                  max={5}
                  sx={{
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      fontSize: "0.875rem",
                    },
                  }}
                >
                  {project.teamMembers &&
                    project.teamMembers.map((member) => (
                      <Avatar
                        key={member.userId}
                        sx={{
                          bgcolor: getPriorityColor(project.priority),
                          border: "2px solid rgba(20, 25, 40, 0.9)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {member.name.charAt(0)}
                      </Avatar>
                    ))}
                </AvatarGroup>
              </Box>
            </Box>
          </Paper>

          {/* To-Do List */}
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              p: 4,
              background: "rgba(20, 25, 40, 0.7)",
              backdropFilter: "blur(16px)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <AssignmentTurnedInIcon sx={{ color: "#00d4ff", fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>
                Project Tasks
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <AnimatePresence>
                {project.todos &&
                  project.todos.map((todo, index) => (
                    <motion.div
                      key={todo._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: "16px",
                          background:
                            todo.status === "completed"
                              ? "rgba(0, 230, 118, 0.05)"
                              : "rgba(255, 255, 255, 0.02)",
                          border: `1px solid ${
                            todo.status === "completed"
                              ? "rgba(0, 230, 118, 0.2)"
                              : "rgba(255, 255, 255, 0.05)"
                          }`,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background:
                              todo.status === "completed"
                                ? "rgba(0, 230, 118, 0.08)"
                                : "rgba(255, 255, 255, 0.04)",
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {/* Checkbox */}
                        <Checkbox
                          checked={todo.status === "completed"}
                          onChange={() => handleToggleTodo(todo._id)}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CheckCircleIcon />}
                          sx={{
                            color: "#718096",
                            "&.Mui-checked": {
                              color: "#00e676",
                            },
                          }}
                        />

                        {/* Task Info */}
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color:
                                todo.status === "completed"
                                  ? "#a0aec0"
                                  : "#fff",
                              textDecoration:
                                todo.status === "completed"
                                  ? "line-through"
                                  : "none",
                              mb: 0.5,
                            }}
                          >
                            {todo.title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              flexWrap: "wrap",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <PersonIcon
                                sx={{ fontSize: 14, color: "#718096" }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ color: "#718096" }}
                              >
                                Assigned:{" "}
                                {todo.employee === "You" ? "You" : "Assigned"}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <AccessTimeIcon
                                sx={{ fontSize: 14, color: "#718096" }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ color: "#718096" }}
                              >
                                Due:{" "}
                                {new Date(todo.duedate).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        {/* Priority & Status */}
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          <Chip
                            label={todo.priority}
                            size="small"
                            sx={{
                              bgcolor: `${getPriorityColor(todo.priority)}15`,
                              color: getPriorityColor(todo.priority),
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              border: `1px solid ${getPriorityColor(todo.priority)}30`,
                            }}
                          />
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: getStatusColor(todo.status),
                              boxShadow: `0 0 8px ${getStatusColor(todo.status)}`,
                            }}
                          />
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Box>
  );
};

export default ProjectDetailView;
