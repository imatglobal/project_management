import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import { AccessTime, FreeBreakfast, Business, Home } from "@mui/icons-material";
import axios from "axios";

const AttendanceWidget = ({ currentUserId }) => {
  // ---- CLOCK (manual safe clock) ----
  const [currentTime, setCurrentTime] = useState(() => {
    const t = new Date();
    t.setDate(27);
    t.setHours(11, 48, 0, 0);
    return t;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prev) => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ---- STATES ----
  const [status, setStatus] = useState("ABSENT");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [loading, setLoading] = useState(false);

  // ---- TIME REFS (no re-render issues) ----
  const workStartRef = useRef(null);
  const breakStartRef = useRef(null);
  const totalBreakMsRef = useRef(0);

  // ---- WORK TIMER ----
  useEffect(() => {
    if (status !== "WORKING") return;

    const interval = setInterval(() => {
      const now = currentTime.getTime();
      const workedMs = now - workStartRef.current - totalBreakMsRef.current;

      setElapsedSeconds(Math.max(0, Math.floor(workedMs / 1000)));
    }, 1000);

    return () => clearInterval(interval);
  }, [status, currentTime]);

  // ---- FORMAT TIME ----
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ---- PUNCH HANDLER ----
  const handlePunch = async (action) => {
    setLoading(true);
    const now = currentTime.getTime();

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8080/admin/attendance",
        {
          action,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (action === "PUNCH_IN") {
        workStartRef.current = now;
        totalBreakMsRef.current = 0;
        setElapsedSeconds(0);
        setStatus("WORKING");
      }

      if (action === "LUNCH_START") {
        breakStartRef.current = now;
        setStatus("ON_BREAK");
      }

      if (action === "LUNCH_END") {
        totalBreakMsRef.current += now - breakStartRef.current;
        breakStartRef.current = null;
        setStatus("WORKING");
      }

      if (action === "PUNCH_OUT") {
        setStatus("COMPLETED");
      }
    } catch (err) {
      console.error("Punch failed", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- STATUS COLOR ----
  const getStatusColor = () => {
    switch (status) {
      case "WORKING":
        return "#4caf50";
      case "ON_BREAK":
        return "#ff9800";
      case "COMPLETED":
        return "#2196f3";
      default:
        return "#f44336";
    }
  };

  // ---- UI ----
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h6" color="#fff" fontWeight={700}>
            <AccessTime sx={{ mr: 1 }} />
            Attendance
          </Typography>
          <Typography variant="caption" color="#a0aec0">
            {currentTime.toDateString()}
          </Typography>
        </Box>

        <Chip
          label={status.replace("_", " ")}
          sx={{
            color: getStatusColor(),
            border: `1px solid ${getStatusColor()}`,
            background: `${getStatusColor()}20`,
            fontWeight: 700,
          }}
        />
      </Box>

      {/* TIMER */}
      <Box textAlign="center">
        <Typography variant="h3" fontWeight={800} color="#fff">
          {status === "ABSENT"
            ? currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : formatTime(elapsedSeconds)}
        </Typography>
        <Typography color="#a0aec0">
          {status === "ABSENT" ? "Ready to start?" : "Effective Working Time"}
        </Typography>
      </Box>

      {/* ACTIONS */}
      <Box mt={2}>
        {status === "ABSENT" && (
          <Button
            fullWidth
            onClick={() => handlePunch("PUNCH_IN")}
            disabled={loading}
            startIcon={<Business />}
          >
            Office In
          </Button>
        )}

        {status === "WORKING" && (
          <Box display="flex" gap={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handlePunch("LUNCH_START")}
              startIcon={<FreeBreakfast />}
            >
              Lunch Break
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => handlePunch("PUNCH_OUT")}
              startIcon={<Home />}
            >
              Office Out
            </Button>
          </Box>
        )}

        {status === "ON_BREAK" && (
          <Button
            fullWidth
            variant="contained"
            onClick={() => handlePunch("LUNCH_END")}
            startIcon={<Business />}
          >
            Resume Work
          </Button>
        )}

        {status === "COMPLETED" && (
          <Typography align="center" color="#4caf50">
            Shift completed 🎉
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AttendanceWidget;
