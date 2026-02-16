import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, useTheme, Fade } from "@mui/material";
import { useParams } from "react-router-dom";
import ActiveProjectTracker from "../../components/dashboard/ActiveProjectTracker";
import ProjectBoard from "../../components/dashboard/ProjectBoard";
import TaskHistory from "../../components/dashboard/TaskHistory";
import WorkReportForm from "../../components/dashboard/WorkReportForm";
import AttendanceWidget from "../../components/AttendanceWidget";
import DeadlineNotifications from "../../components/dashboard/DeadlineNotifications";
import ProjectsPreview from "../../components/dashboard/ProjectsPreview";
import axios from "axios";

// Mock Data for Active Project
const mockActiveProject = {
  title: "AI-Powered Analytics Engine",
  description:
    "Developing a predictive analysis model for user behavior tracking using Python and TensorFlow.",
  progress: 78,
  deadline: "2024-11-30",
};

const EmployeeCockpit = (props) => {
  const { deptId: paramDeptId } = useParams();
  const deptId = props.deptId || paramDeptId || "it"; // Default to IT
  const theme = useTheme();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock User ID for role logic (In real app, get from Auth Context)
  const currentUserId = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simulating API call or using real one if available
        // const res = await axios.get(`http://localhost:8080/admin/get_kanban_task?dept=${deptId}`);
        // setTasks(res.data);

        // Fallback Mock Data
        const mockTasks = [
          {
            _id: "t1",
            title: "API Gateway config",
            status: "pending",
            priority: "High",
            assignedTo: "user_123",
            desc: "Setup Kong gateway",
          },
          {
            _id: "t2",
            title: "Auth Service",
            status: "in_progress",
            priority: "Critical",
            assignedTo: "user_123",
            desc: "OAuth2 implementation",
          },
          {
            _id: "t3",
            title: "DB Migration",
            status: "completed",
            priority: "Medium",
            assignedTo: "user_456",
            desc: "Migrate from Mongo to Postgres",
          }, // Not assigned to user
          {
            _id: "t4",
            title: "Frontend Unit Tests",
            status: "pending",
            priority: "Low",
            assignedTo: "user_123",
            desc: "Jest setup",
          },
        ];

        // Simulate delay
        setTimeout(() => {
          setTasks(mockTasks);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching tasks", err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [deptId]);

  return (
    <Box sx={{ width: "100%", height: "100%", pb: 4 }}>
      <Fade in={true} timeout={800}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.5px",
            }}
          >
            Mission Control
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#a0aec0" }}>
            Welcome back, Agent. Here is your daily briefing.
          </Typography>

          {/* Deadline Notifications */}
          <DeadlineNotifications userId={currentUserId} />

          {/* Projects Preview with View/Enroll Options */}
          <ProjectsPreview userId={currentUserId} maxProjects={3} />

          {/* Top Row: Active Project & Quick Reporting */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <ActiveProjectTracker project={mockActiveProject} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AttendanceWidget currentUserId={currentUserId} />
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={12}>
              <WorkReportForm deptId={deptId} />
            </Grid>
          </Grid>

          {/* Middle Row: Kanban Board */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: 700, color: "#fff" }}
            >
              Active Operations
            </Typography>
            <ProjectBoard
              tasks={tasks}
              setTasks={setTasks}
              currentUserId={currentUserId}
            />
          </Box>

          {/* Bottom Row: History */}
          <Box>
            <TaskHistory />
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default EmployeeCockpit;
