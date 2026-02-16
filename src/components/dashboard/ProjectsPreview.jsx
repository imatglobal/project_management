import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Chip, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FolderIcon from "@mui/icons-material/Folder";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";

const ProjectsPreview = ({ userId }) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // TODO: Replace with actual API call
        // const res = await axios.get(`/api/projects/assigned?userId=${userId}&limit=${maxProjects}`);
        // setProjects(res.data);
        axios
          .get("http://localhost:8080/employee_included_proj", {
            headers: {
              Authorization: `${userId}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res.data);
            setProjects(res.data);
          });

        // Mock data
        const mockProjects = [
          {
            _id: "p1",
            title: "AI-Powered Analytics Engine",
            progress: 78,
            deadline: "2026-02-05",
            isEnrolled: true,
            priority: "High",
          },
          {
            _id: "p2",
            title: "Cloud Migration Phase 2",
            progress: 45,
            deadline: "2026-02-15",
            isEnrolled: true,
            priority: "Critical",
          },
          {
            _id: "p3",
            title: "Mobile App Redesign",
            progress: 92,
            deadline: "2026-02-02",
            isEnrolled: false,
            priority: "Medium",
          },
        ];
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [userId]);

  const handleEnroll = async (projectId) => {
    try {
      // TODO: Replace with actual API call
      // await axios.post('/api/projects/enroll', { projectId, userId });

      setProjects(
        projects.map((p) =>
          p._id === projectId ? { ...p, isEnrolled: true } : p,
        ),
      );
    } catch (error) {
      console.error("Error enrolling in project:", error);
    }
  };

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

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (projects.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      {/* Section Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <FolderIcon sx={{ color: "#00d4ff", fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>
            My Projects
          </Typography>
        </Box>
        <Button
          variant="text"
          onClick={() => navigate("/app/projects")}
          sx={{
            color: "#00d4ff",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "rgba(0, 212, 255, 0.1)",
            },
          }}
        >
          View All →
        </Button>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={2}>
        {projects.map((project, index) => {
          const daysRemaining = getDaysRemaining(project.deadline);
          const isUrgent = daysRemaining <= 7;

          return (
            <Grid item xs={12} md={4} key={project._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Paper
                  sx={{
                    p: 2.5,
                    borderRadius: "16px",
                    background: "rgba(20, 25, 40, 0.6)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${isUrgent ? "rgba(255, 171, 0, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      border: `1px solid ${getPriorityColor(project.priority)}40`,
                      boxShadow: `0 4px 20px ${getPriorityColor(project.priority)}15`,
                    },
                  }}
                >
                  {/* Background Glow */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-30%",
                      right: "-20%",
                      width: "120px",
                      height: "120px",
                      background: `radial-gradient(circle, ${getPriorityColor(project.priority)}15 0%, transparent 70%)`,
                      filter: "blur(30px)",
                      zIndex: 0,
                    }}
                  />

                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Priority Badge */}
                    <Chip
                      label={project.priority}
                      size="small"
                      sx={{
                        alignSelf: "flex-start",
                        mb: 1.5,
                        bgcolor: `${getPriorityColor(project.priority)}20`,
                        color: getPriorityColor(project.priority),
                        fontWeight: 700,
                        border: `1px solid ${getPriorityColor(project.priority)}40`,
                        fontSize: "0.7rem",
                      }}
                    />

                    {/* Title */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "#fff",
                        mb: 2,
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "2.6em",
                      }}
                    >
                      {project.title}
                    </Typography>

                    {/* Progress */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <TrendingUpIcon
                            sx={{ fontSize: 14, color: "#a0aec0" }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: "#a0aec0", fontWeight: 600 }}
                          >
                            Progress
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "#00d4ff", fontWeight: 700 }}
                        >
                          {project.progress}%
                        </Typography>
                      </Box>

                      {/* Liquid Progress Bar */}
                      <Box
                        sx={{
                          position: "relative",
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "rgba(255, 255, 255, 0.05)",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.description}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          style={{
                            height: "100%",
                            background: `linear-gradient(90deg, ${getPriorityColor(project.priority)} 0%, ${getPriorityColor(project.priority)}70 100%)`,
                            borderRadius: 3,
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `linear-gradient(90deg, transparent, ${getPriorityColor(project.priority)}40, transparent)`,
                              animation: "wave 2s infinite linear",
                              "@keyframes wave": {
                                "0%": { transform: "translateX(-100%)" },
                                "100%": { transform: "translateX(100%)" },
                              },
                            }}
                          />
                        </motion.div>
                      </Box>
                    </Box>

                    {/* Deadline */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 2,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{
                          fontSize: 14,
                          color: isUrgent ? "#ffab00" : "#a0aec0",
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: isUrgent ? "#ffab00" : "#a0aec0",
                          fontWeight: isUrgent ? 700 : 500,
                        }}
                      >
                        {daysRemaining} days left
                      </Typography>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
                        onClick={() => navigate(`/app/projects/${project._id}`)}
                        sx={{
                          flex: 1,
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          py: 0.75,
                          background:
                            "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
                          boxShadow: "0 2px 8px rgba(0, 212, 255, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #00bbee 0%, #0088bb 100%)",
                          },
                        }}
                      >
                        View
                      </Button>
                      {!project.isEnrolled && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<PersonAddIcon sx={{ fontSize: 16 }} />}
                          onClick={() => handleEnroll(project._id)}
                          sx={{
                            flex: 1,
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.8rem",
                            py: 0.75,
                            borderColor: "rgba(0, 230, 118, 0.5)",
                            color: "#00e676",
                            "&:hover": {
                              borderColor: "#00e676",
                              bgcolor: "rgba(0, 230, 118, 0.1)",
                            },
                          }}
                        >
                          Enroll
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProjectsPreview;
