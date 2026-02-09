import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import TaskAssignmentModal from "./TaskAssignmentModal";

const HeadProjectView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assignment Modal State
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/headProj",
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        setProjectsList(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#38bdf8";
      case "Completed":
        return "#4ade80";
      case "Critical":
        return "#f43f5e";
      case "Planning":
        return "#fbbf24";
      default:
        return "#94a3b8";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "#f43f5e";
      case "High":
        return "#fb7185";
      case "Medium":
        return "#fbbf24";
      case "Low":
        return "#4ade80";
      default:
        return "#94a3b8";
    }
  };

  const filteredProjects = projectsList.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, sm: 3, md: 6 },
        background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
        position: "relative",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)",
          zIndex: 0,
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          mb: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/head")}
              sx={{
                color: "#64748b",
                mb: 2,
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  color: "#38bdf8",
                  background: "rgba(56, 189, 248, 0.05)",
                },
              }}
            >
              Back to Dashboard
            </Button>
            <Typography
              variant="h2"
              sx={{
                color: "#f8fafc",
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                letterSpacing: "-0.02em",
                mb: 1,
                background: "linear-gradient(to right, #fff, #94a3b8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Enterprise Projects
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#64748b", fontWeight: 400, maxWidth: 600 }}
            >
              Sophisticated management interface for high-level departmental
              oversight and resource orchestration.
            </Typography>
          </motion.div>
        </Box>

        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <TextField
            placeholder="Explore projects..."
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#38bdf8" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", sm: 400 },
              "& .MuiOutlinedInput-root": {
                color: "#f1f5f9",
                bgcolor: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(12px)",
                borderRadius: 3,
                border: "1px solid rgba(148, 163, 184, 0.1)",
                transition: "all 0.3s ease",
                "& fieldset": { border: "none" },
                "&:hover": {
                  bgcolor: "rgba(15, 23, 42, 0.8)",
                  boxShadow: "0 0 20px rgba(56, 189, 248, 0.1)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 0 30px rgba(56, 189, 248, 0.15)",
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Projects Grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Box sx={{ width: "300px" }}>
            <LinearProgress
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: "rgba(56, 189, 248, 0.1)",
                "& .MuiLinearProgress-bar": { bgcolor: "#38bdf8" },
              }}
            />
            <Typography
              sx={{
                color: "#64748b",
                textAlign: "center",
                mt: 2,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Synchronizing Infrastructure
            </Typography>
          </Box>
        </Box>
      ) : (
        <Grid container spacing={5} sx={{ position: "relative", zIndex: 1 }}>
          {filteredProjects.map((project, index) => {
            const teamMembers = project.teamMembers || [];
            const tasks = project.todos || [];
            const completedTasks = tasks.filter(
              (t) => t.status === "completed",
            ).length;
            const progress =
              tasks.length > 0
                ? Math.round((completedTasks / tasks.length) * 100)
                : 0;
            const statusColor = getStatusColor(project.status || "Active");

            return (
              <Grid item xs={12} md={6} lg={4} key={project._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                >
                  <Card
                    sx={{
                      cursor: "pointer",
                      background: "rgba(15, 23, 42, 0.4)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: 6,
                      position: "relative",
                      overflow: "visible",
                      height: "100%",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        background: "rgba(15, 23, 42, 0.6)",
                        borderColor: "rgba(56, 189, 248, 0.3)",
                        boxShadow: `0 20px 40px -20px ${statusColor}40`,
                        "& .project-icon": {
                          transform: "scale(1.1) rotate(5deg)",
                          color: statusColor,
                        },
                      },
                    }}
                  >
                    {/* Status Glow */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -20,
                        right: 20,
                        width: 80,
                        height: 80,
                        background: `radial-gradient(circle, ${statusColor}15 0%, transparent 70%)`,
                        zIndex: -1,
                      }}
                    />

                    <CardContent
                      sx={{
                        p: 4,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Top Row */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 4,
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          className="project-icon"
                          sx={{
                            width: 56,
                            height: 56,
                            bgcolor: "rgba(15, 23, 42, 0.8)",
                            border: `1px solid ${statusColor}30`,
                            color: "#94a3b8",
                            transition: "all 0.4s ease",
                            borderRadius: 3,
                          }}
                        >
                          <FolderIcon fontSize="large" />
                        </Avatar>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Chip
                            label={project.status || "Active"}
                            size="small"
                            sx={{
                              bgcolor: `${statusColor}10`,
                              color: statusColor,
                              fontWeight: 700,
                              fontSize: "0.65rem",
                              textTransform: "uppercase",
                              letterSpacing: 1,
                              border: `1px solid ${statusColor}20`,
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              color: "rgba(255, 255, 255, 0.2)",
                              "&:hover": { color: "#fff" },
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Title & Info */}
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#38bdf8",
                          fontWeight: 700,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          mb: 1,
                          display: "block",
                        }}
                      >
                        Ref:{" "}
                        {project._id
                          .substring(project._id.length - 6)
                          .toUpperCase()}
                      </Typography>

                      <Typography
                        variant="h5"
                        sx={{
                          color: "#f8fafc",
                          fontWeight: 700,
                          mb: 2,
                          lineHeight: 1.3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {project.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          mb: 4,
                          lineHeight: 1.6,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          minHeight: 68,
                        }}
                      >
                        {project.description}
                      </Typography>

                      {/* Progress Section */}
                      <Box
                        sx={{
                          mb: 4,
                          bgcolor: "rgba(15, 23, 42, 0.4)",
                          p: 2,
                          borderRadius: 4,
                          border: "1px solid rgba(255, 255, 255, 0.03)",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: "#94a3b8", fontWeight: 600 }}
                          >
                            Completion Strategy
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: statusColor, fontWeight: 800 }}
                          >
                            {progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(255, 255, 255, 0.05)",
                            "& .MuiLinearProgress-bar": {
                              background: `linear-gradient(90deg, ${statusColor}, ${statusColor}dd)`,
                              borderRadius: 3,
                              boxShadow: `0 0 10px ${statusColor}40`,
                            },
                          }}
                        />
                      </Box>

                      {/* Metadata Grid */}
                      <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid item xs={6}>
                          <Box
                            sx={{
                              borderLeft: `2px solid ${getPriorityColor(project.priority)}`,
                              pl: 1.5,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#64748b",
                                display: "block",
                                mb: 0.5,
                              }}
                            >
                              Priority
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#f1f5f9", fontWeight: 700 }}
                            >
                              {project.priority || "Medium"}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            sx={{
                              borderLeft: "2px solid rgba(148, 163, 184, 0.2)",
                              pl: 1.5,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#64748b",
                                display: "block",
                                mb: 0.5,
                              }}
                            >
                              Deadline
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#f1f5f9", fontWeight: 700 }}
                            >
                              {project.deadline || "n/a"}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Footer Actions */}
                      <Box
                        sx={{
                          mt: "auto",
                          pt: 3,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <AvatarGroup
                          max={4}
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              fontSize: "0.75rem",
                              border: "2px solid #0f172a",
                              background:
                                "linear-gradient(135deg, #1e293b, #0f172a)",
                              color: "#38bdf8",
                            },
                          }}
                        >
                          {teamMembers.map((m, i) => (
                            <Tooltip key={i} title={m.name || "Specialist"}>
                              <Avatar>
                                {m.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("") || "S"}
                              </Avatar>
                            </Tooltip>
                          ))}
                        </AvatarGroup>

                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Configure Parameters">
                            <IconButton
                              size="small"
                              sx={{
                                color: "#64748b",
                                bgcolor: "rgba(255, 255, 255, 0.03)",
                                "&:hover": {
                                  color: "#4ade80",
                                  bgcolor: "rgba(74, 222, 128, 0.1)",
                                },
                              }}
                            >
                              <EditIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Decommission Project">
                            <IconButton
                              size="small"
                              sx={{
                                color: "#64748b",
                                bgcolor: "rgba(255, 255, 255, 0.03)",
                                "&:hover": {
                                  color: "#f43f5e",
                                  bgcolor: "rgba(244, 63, 94, 0.1)",
                                },
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Box sx={{ textAlign: "center", mt: 15 }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(15, 23, 42, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 32px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                color: "#64748b",
              }}
            >
              <SearchIcon sx={{ fontSize: 48 }} />
            </Box>
            <Typography
              variant="h5"
              sx={{ color: "#f8fafc", fontWeight: 700, mb: 1 }}
            >
              No Data Matched Your Query
            </Typography>
            <Typography sx={{ color: "#64748b" }}>
              Try adjusting your parameters or contact the system administrator.
            </Typography>
          </Box>
        </motion.div>
      )}

      {/* Assignment Modal */}
      <TaskAssignmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectData={selectedProject}
        onSave={(data) => {
          console.log("Saving Assignments in HeadProjectView:", data);
          // Here the user will integrate with backend
        }}
      />
    </Box>
  );
};

export default HeadProjectView;
