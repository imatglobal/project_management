import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Collapse,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const DeadlineNotifications = ({ userId }) => {
  const [deadlines, setDeadlines] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        // TODO: Replace with actual API call
        // const res = await axios.get(`/api/projects/deadlines?userId=${userId}`);
        // setDeadlines(res.data);

        // Mock data for now
        const mockDeadlines = [
          {
            projectId: "p1",
            title: "AI Analytics Engine",
            deadline: "2026-02-05",
            daysRemaining: 5,
          },
          {
            projectId: "p2",
            title: "Cloud Migration Phase 2",
            deadline: "2026-02-15",
            daysRemaining: 15,
          },
          {
            projectId: "p3",
            title: "Mobile App Redesign",
            deadline: "2026-02-02",
            daysRemaining: 2,
          },
        ];

        setTimeout(() => {
          setDeadlines(mockDeadlines);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching deadlines:", error);
        setLoading(false);
      }
    };

    fetchDeadlines();
  }, [userId]);

  const getUrgencyLevel = (days) => {
    if (days <= 2)
      return { level: "critical", color: "#ff5b5b", icon: ErrorOutlineIcon };
    if (days <= 7)
      return { level: "warning", color: "#ffab00", icon: WarningAmberIcon };
    return { level: "normal", color: "#00e676", icon: CheckCircleOutlineIcon };
  };

  const urgentDeadlines = deadlines.filter((d) => d.daysRemaining <= 7);

  if (loading || urgentDeadlines.length === 0) return null;

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        mb: 3,
        background: "rgba(20, 25, 40, 0.6)",
        backdropFilter: "blur(16px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 171, 0, 0.2)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated glow effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #ffab00, transparent)",
          animation: "shimmer 3s infinite",
          "@keyframes shimmer": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" },
          },
        }}
      />

      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, rgba(255, 171, 0, 0.2), rgba(255, 91, 91, 0.2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)", opacity: 1 },
                "50%": { transform: "scale(1.05)", opacity: 0.8 },
              },
            }}
          >
            <NotificationsActiveIcon sx={{ color: "#ffab00", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "#fff" }}
            >
              Upcoming Deadlines
            </Typography>
            <Typography variant="caption" sx={{ color: "#a0aec0" }}>
              {urgentDeadlines.length} project
              {urgentDeadlines.length !== 1 ? "s" : ""} need attention
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" sx={{ color: "#a0aec0" }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Deadline List */}
      <Collapse in={expanded}>
        <Box sx={{ px: 2, pb: 2 }}>
          <AnimatePresence>
            {urgentDeadlines.map((deadline, index) => {
              const urgency = getUrgencyLevel(deadline.daysRemaining);
              const UrgencyIcon = urgency.icon;

              return (
                <motion.div
                  key={deadline.projectId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      mb: 1.5,
                      p: 2,
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${urgency.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.04)",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flex: 1,
                      }}
                    >
                      <UrgencyIcon
                        sx={{ color: urgency.color, fontSize: 24 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#fff", mb: 0.5 }}
                        >
                          {deadline.title}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTimeIcon
                            sx={{ fontSize: 14, color: "#a0aec0" }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: "#a0aec0" }}
                          >
                            Due:{" "}
                            {new Date(deadline.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Chip
                      label={`${deadline.daysRemaining} day${deadline.daysRemaining !== 1 ? "s" : ""}`}
                      size="small"
                      sx={{
                        bgcolor: `${urgency.color}20`,
                        color: urgency.color,
                        fontWeight: 700,
                        border: `1px solid ${urgency.color}40`,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default DeadlineNotifications;
