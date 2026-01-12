import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Stack,
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleIcon from "@mui/icons-material/People";
import TimelineIcon from "@mui/icons-material/Timeline";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import StarIcon from "@mui/icons-material/Star";
import { GlassContainer } from "../components/common/GlassComp";

const CodeDisplay = () => {
  const [currentFile, setCurrentFile] = React.useState("Dashboard.jsx");

  const codeFiles = {
    "Dashboard.jsx": `import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import { api } from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const activeTasks = tasks.filter(task =>
    task.status !== 'completed'
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Project Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {activeTasks.length} active tasks • {tasks.length} total
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {activeTasks.map(task => (
          <Grid item xs={12} md={6} lg={4} key={task.id}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;`,
    "TaskCard.jsx": `import React from 'react';
import {
  Card, CardContent, Typography,
  Chip, LinearProgress, Avatar
} from '@mui/material';

const TaskCard = ({ task }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'review': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44aa44';
      default: return '#666666';
    }
  };

  return (
    <Card sx={{
      height: '100%',
      cursor: 'pointer',
      '&:hover': { boxShadow: 3 }
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>

        <Chip
          label={task.status.replace('_', ' ')}
          color={getStatusColor(task.status)}
          size="small"
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={task.progress}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
              {task.assignee[0]}
            </Avatar>
            <Typography variant="body2">
              {task.assignee}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: getPriorityColor(task.priority) }}
          >
            {task.priority.toUpperCase()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;`,
    "api.js": `import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;`
  };

  const fileTabs = Object.keys(codeFiles);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* File Tabs */}
      <Box sx={{ display: 'flex', mb: 1, gap: 0.5, flexWrap: 'wrap' }}>
        {fileTabs.map((file) => (
          <Box
            key={file}
            onClick={() => setCurrentFile(file)}
            sx={{
              px: 1.5,
              py: 0.5,
              bgcolor: currentFile === file ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255,255,255,0.05)',
              borderRadius: 1,
              cursor: 'pointer',
              border: currentFile === file ? '1px solid #00d4ff' : '1px solid transparent',
              '&:hover': {
                bgcolor: 'rgba(0, 212, 255, 0.05)',
              },
              fontSize: '0.7rem',
              fontFamily: 'monospace',
              color: currentFile === file ? '#00d4ff' : '#a0aec0',
              whiteSpace: 'nowrap',
            }}
          >
            {file}
            {currentFile === file && (
              <Box
                component="span"
                sx={{
                  ml: 1,
                  width: 8,
                  height: 8,
                  bgcolor: '#00d4ff',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Code Content */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#0d1117',
          borderRadius: 1,
          p: 1.5,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          lineHeight: 1.4,
          color: '#f8f8f2',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(0, 212, 255, 0.3)',
            borderRadius: 2,
          },
        }}
      >
        <pre style={{
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          <code>
            {codeFiles[currentFile].split('\n').map((line, index) => {
              const lineNumber = index + 1;
              const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*');
              const isImport = line.trim().startsWith('import');
              const isExport = line.trim().startsWith('export');
              const isKeyword = /\b(const|let|var|function|return|if|else|for|while|try|catch|class|extends|async|await)\b/.test(line);
              const isString = /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/.test(line);

              return (
                <span key={index} style={{ display: 'block' }}>
                  <span style={{
                    color: '#6b7280',
                    marginRight: '1rem',
                    userSelect: 'none',
                    display: 'inline-block',
                    width: '2rem',
                    textAlign: 'right'
                  }}>
                    {lineNumber}
                  </span>
                  <span style={{
                    color: isComment ? '#6b7280' :
                           isImport || isExport ? '#60a5fa' :
                           isKeyword ? '#c084fc' :
                           isString ? '#34d399' : '#f8f8f2'
                  }}>
                    {line}
                  </span>
                </span>
              );
            })}
          </code>
        </pre>
      </Box>
    </Box>
  );
};

const TypingText = ({ text, variant = "h6", sx = {} }) => {
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <Typography variant={variant} sx={sx}>
      {displayedText}
      <span className="cursor">|</span>
      <style>{`
        .cursor { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </Typography>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0a0e17",
        color: "#fff",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Background Effects */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "800px",
          background:
            "radial-gradient(circle at center, rgba(0, 212, 255, 0.08) 0%, rgba(0,0,0,0) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, rgba(0,0,0,0) 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Navbar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          bgcolor: "rgba(10, 14, 23, 0.9)",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 1.5, sm: 2 },
            px: { xs: 2, sm: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              fontSize: { xs: "1.1rem", sm: "1.25rem" }
            }}
          >
            Tasks<span style={{ color: "#00d4ff" }}>.</span>
          </Typography>
          <Box sx={{
            display: "flex",
            gap: { xs: 0.5, sm: 1, md: 2 },
            alignItems: "center"
          }}>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "#a0aec0",
                fontWeight: 600,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                px: { xs: 1, sm: 2 },
                minWidth: "auto",
                "&:hover": { color: "#fff" },
              }}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                borderRadius: "12px",
                background: "#00d4ff",
                color: "#000",
                fontWeight: 700,
                px: { xs: 2, md: 3 },
                py: { xs: 0.75, sm: 1 },
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                minWidth: "auto",
                "&:hover": { background: "#33dcff" },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 12, sm: 15, md: 20 },
          pb: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 3 },
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "rgba(0, 212, 255, 0.1)",
            color: "#00d4ff",
            px: 2,
            py: 0.5,
            borderRadius: "20px",
            mb: 3,
            border: "1px solid rgba(0, 212, 255, 0.2)",
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 16 }} />
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, letterSpacing: 0.5 }}
          >
            THE FUTURE OF PROJECT MANAGEMENT
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "5.5rem" },
            fontWeight: 800,
            lineHeight: 1.1,
            mb: 3,
            px: { xs: 1, sm: 0 },
            background:
              "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-2px",
          }}
        >
          Manage projects with{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #00d4ff, #005bea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(0,212,255,0.3))",
            }}
          >
            Supernatural Speed
          </span>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "#a0aec0",
            maxWidth: 700,
            mx: "auto",
            mb: 6,
            lineHeight: 1.6,
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            px: { xs: 2, sm: 0 },
          }}
        >
          Transform chaos into clarity. A unified workspace where engineering and product teams collaborate seamlessly to ship faster and smarter.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 2 }}
          justifyContent="center"
          sx={{ mb: { xs: 6, sm: 8, md: 10 }, px: { xs: 2, sm: 0 } }}
        >
          <Button
            size="large"
            variant="contained"
            onClick={() => navigate("/signup")}
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              py: { xs: 1.5, sm: 1.5 },
              px: { xs: 4, sm: 5 },
              borderRadius: "12px",
              background: "#fff",
              color: "#000",
              fontWeight: 700,
              minHeight: { xs: 48, sm: 56 },
              "&:hover": {
                background: "#e0e0e0",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s",
            }}
          >
            Start Free Trial
          </Button>
          <Button
            size="large"
            variant="outlined"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              py: { xs: 1.5, sm: 1.5 },
              px: { xs: 4, sm: 5 },
              borderRadius: "12px",
              borderColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              minHeight: { xs: 48, sm: 56 },
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Watch Demo
          </Button>
        </Stack>

        {/* Dashboard Mockup */}
        <Box
          sx={{
            position: "relative",
            mx: "auto",
            maxWidth: { xs: 320, sm: 600, md: 1000 },
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.1)",
            bgcolor: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(10px)",
            p: { xs: 0.5, sm: 1 },
            boxShadow:
              "0 50px 100px -20px rgba(0,0,0,0.5), 0 0 50px -10px rgba(0, 212, 255, 0.1)",
          }}
        >
          <Box
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
              bgcolor: "#0d1117",
            }}
          >
            {/* Browser Header */}
            <Box
              sx={{
                height: 40,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                px: 2,
                gap: 1,
              }}
            >
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ff5f56" }} />
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ffbd2e" }} />
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#27c93f" }} />
            </Box>
            {/* Content */}
            <Grid container>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  borderRight: { xs: "none", sm: "1px solid rgba(255,255,255,0.1)" },
                  borderBottom: { xs: "1px solid rgba(255,255,255,0.1)", sm: "none" },
                  height: { xs: 200, sm: 300, md: 500 },
                  p: { xs: 1.5, sm: 2 },
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#a0aec0",
                    fontSize: "0.6rem",
                    mb: 1,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Project Files
                </Typography>
                <CodeDisplay />
              </Grid>
              <Grid item xs={12} sm={8} sx={{ p: { xs: 1.5, sm: 2, md: 4 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 4,
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Box>
                    <TypingText
                      text="Project Dashboard"
                      variant="h6"
                      sx={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: { xs: "1rem", md: "1.25rem" },
                        fontFamily: "monospace",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "#a0aec0", fontSize: "0.8rem" }}
                    >
                      12 active tasks • 3 team members
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: 120 },
                      height: 40,
                      bgcolor: "#00d4ff",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      "&:hover": { bgcolor: "#33dcff" },
                    }}
                  >
                    <Typography
                      variant="button"
                      sx={{ color: "#000", fontWeight: 700, fontSize: "0.8rem" }}
                    >
                      + New Task
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  {[
                    {
                      title: "Implement User Authentication",
                      status: "In Progress",
                      priority: "High",
                      assignee: "John D.",
                      progress: 75,
                    },
                    {
                      title: "Design System Update",
                      status: "Review",
                      priority: "Medium",
                      assignee: "Sarah M.",
                      progress: 90,
                    },
                    {
                      title: "API Integration",
                      status: "Completed",
                      priority: "High",
                      assignee: "Mike R.",
                      progress: 100,
                    },
                  ].map((task, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <Box
                        sx={{
                          height: { xs: 120, sm: 140, md: 150 },
                          bgcolor: "rgba(255,255,255,0.03)",
                          borderRadius: 3,
                          border: "1px solid rgba(255,255,255,0.05)",
                          p: { xs: 1.5, sm: 2 },
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "#00d4ff",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: "#fff",
                              fontWeight: 600,
                              mb: 1,
                              fontSize: "0.85rem",
                              lineHeight: 1.3,
                            }}
                          >
                            {task.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                bgcolor:
                                  task.status === "Completed"
                                    ? "#27c93f"
                                    : task.status === "In Progress"
                                    ? "#ffbd2e"
                                    : "#00d4ff",
                                mr: 1,
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: "#a0aec0", fontSize: "0.7rem" }}
                            >
                              {task.status}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              width: "100%",
                              height: 4,
                              bgcolor: "rgba(255,255,255,0.1)",
                              borderRadius: 2,
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: `${task.progress}%`,
                                height: "100%",
                                bgcolor: "#00d4ff",
                                borderRadius: 2,
                                transition: "width 0.3s",
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "#a0aec0", fontSize: "0.7rem" }}
                            >
                              {task.assignee}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color:
                                  task.priority === "High"
                                    ? "#ff5f56"
                                    : task.priority === "Medium"
                                    ? "#ffbd2e"
                                    : "#27c93f",
                                fontSize: "0.7rem",
                                fontWeight: 600,
                              }}
                            >
                              {task.priority}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8, md: 15 }, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: { xs: 6, sm: 8 },
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
            fontWeight: 700,
            px: { xs: 1, sm: 0 },
            background: "linear-gradient(135deg, #fff 0%, #00d4ff 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              step: "01",
              title: "Create Your Workspace",
              desc: "Set up your team and projects in minutes with our intuitive interface.",
              icon: <PeopleIcon sx={{ fontSize: 40, color: "#00d4ff" }} />,
              gradient: "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%)",
            },
            {
              step: "02",
              title: "Assign & Track Tasks",
              desc: "Break down projects into manageable tasks and monitor progress in real-time.",
              icon: <TimelineIcon sx={{ fontSize: 40, color: "#00d4ff" }} />,
              gradient: "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%)",
            },
            {
              step: "03",
              title: "Collaborate & Deploy",
              desc: "Work together seamlessly and deploy with confidence using our integrated tools.",
              icon: <BoltIcon sx={{ fontSize: 40, color: "#00d4ff" }} />,
              gradient: "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%)",
            },
          ].map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <GlassContainer
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: item.gradient,
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    zIndex: -1,
                  },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(0, 212, 255, 0.15), 0 0 0 1px rgba(0, 212, 255, 0.2)",
                    borderColor: "#00d4ff",
                    "&::before": {
                      opacity: 1,
                    },
                    "& .step-number": {
                      transform: "scale(1.1)",
                      boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
                    },
                    "& .step-icon": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                }}
              >
                <Box
                  className="step-number"
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    bgcolor: "linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)",
                    color: "#00d4ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    mx: "auto",
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    border: "2px solid rgba(0, 212, 255, 0.3)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: -2,
                      borderRadius: "50%",
                      padding: 2,
                      background: "linear-gradient(135deg, rgba(0, 212, 255, 0.3), transparent)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMaskComposite: "xor",
                    },
                  }}
                >
                  {item.step}
                </Box>
                <Box
                  className="step-icon"
                  sx={{
                    mb: 3,
                    transition: "all 0.3s ease",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    mb: 2,
                    fontSize: "1.25rem",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#a0aec0",
                    lineHeight: 1.6,
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.desc}
                </Typography>
              </GlassContainer>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8, md: 15 }, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: { xs: 6, sm: 8 },
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
            fontWeight: 700,
            px: { xs: 1, sm: 0 },
          }}
        >
          Why Choose Tasks?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <BoltIcon />,
              title: "Real-time Collaboration",
              desc: "Work together instantly with live updates and notifications.",
            },
            {
              icon: <SecurityIcon />,
              title: "Enterprise Security",
              desc: "Bank-level encryption and compliance standards protect your data.",
            },
            {
              icon: <SpeedIcon />,
              title: "Lightning Performance",
              desc: "Optimized for speed with sub-100ms response times globally.",
            },
          ].map((feature, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <GlassContainer
                sx={{
                  p: 4,
                  height: "100%",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "#00d4ff",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "12px",
                    bgcolor: "rgba(0, 212, 255, 0.1)",
                    color: "#00d4ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", fontWeight: 700, mb: 1 }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#a0aec0" }}>
                  {feature.desc}
                </Typography>
              </GlassContainer>
            </Grid>
          ))}
        </Grid>
      </Container>



      {/* Pricing */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8, md: 15 }, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
            fontWeight: 700,
            px: { xs: 1, sm: 0 },
          }}
        >
          Simple, Transparent Pricing
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: { xs: 6, sm: 8 },
            color: "#a0aec0",
            maxWidth: 600,
            mx: "auto",
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
            px: { xs: 2, sm: 0 },
          }}
        >
          Choose the plan that fits your team. Upgrade or downgrade at any time.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              name: "Starter",
              price: "Free",
              desc: "Perfect for small teams getting started",
              features: ["Up to 3 projects", "Basic task management", "Email support", "1GB storage"],
              popular: false,
            },
            {
              name: "Professional",
              price: "$19",
              desc: "For growing teams that need more power",
              features: ["Unlimited projects", "Advanced analytics", "Priority support", "10GB storage", "API access"],
              popular: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              desc: "Tailored solutions for large organizations",
              features: ["Everything in Professional", "Custom integrations", "Dedicated support", "Unlimited storage", "SLA guarantee"],
              popular: false,
            },
          ].map((plan, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <GlassContainer
                sx={{
                  p: { xs: 3, sm: 4 },
                  height: "100%",
                  position: "relative",
                  border: plan.popular ? "2px solid #00d4ff" : "1px solid rgba(255,255,255,0.05)",
                  transform: { xs: "none", sm: plan.popular ? "scale(1.02)" : "none" },
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: { xs: "translateY(-2px)", sm: plan.popular ? "scale(1.05)" : "translateY(-5px)" },
                  },
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "#00d4ff",
                      color: "#000",
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <Typography
                  variant="h5"
                  sx={{ color: "#fff", fontWeight: 700, mb: 1, textAlign: "center" }}
                >
                  {plan.name}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#00d4ff",
                    fontWeight: 800,
                    mb: 2,
                    textAlign: "center",
                    fontSize: plan.price === "Free" ? "2rem" : "2.5rem",
                  }}
                >
                  {plan.price}
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <Typography component="span" variant="h6" sx={{ color: "#a0aec0" }}>
                      /month
                    </Typography>
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#a0aec0", mb: 3, textAlign: "center" }}
                >
                  {plan.desc}
                </Typography>
                <List dense>
                  {plan.features.map((feature, i) => (
                    <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon sx={{ color: "#00d4ff", fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: { color: "#a0aec0" },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button
                  fullWidth
                  variant={plan.popular ? "contained" : "outlined"}
                  sx={{
                    mt: 3,
                    borderRadius: "12px",
                    py: 1.5,
                    fontWeight: 700,
                    background: plan.popular ? "#00d4ff" : "transparent",
                    color: plan.popular ? "#000" : "#fff",
                    borderColor: "rgba(255,255,255,0.2)",
                    "&:hover": {
                      background: plan.popular ? "#33dcff" : "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  {plan.price === "Free" ? "Get Started" : plan.price === "Custom" ? "Contact Sales" : "Start Trial"}
                </Button>
              </GlassContainer>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 6, sm: 8, md: 12 },
          px: { xs: 2, sm: 3 },
          bgcolor: "rgba(0, 212, 255, 0.05)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", px: { xs: 1, sm: 0 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
              fontWeight: 700,
              px: { xs: 1, sm: 0 },
            }}
          >
            Ready to Transform Your Workflow?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#a0aec0",
              mb: { xs: 4, sm: 6 },
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
              px: { xs: 2, sm: 0 },
            }}
          >
            Join thousands of teams already using Tasks to manage projects more efficiently.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                fontSize: "1.1rem",
                py: 1.5,
                px: 6,
                borderRadius: "12px",
                background: "#00d4ff",
                color: "#000",
                fontWeight: 700,
                "&:hover": { background: "#33dcff" },
              }}
            >
              Start Your Free Trial
            </Button>
            <Button
              size="large"
              variant="outlined"
              sx={{
                fontSize: "1.1rem",
                py: 1.5,
                px: 6,
                borderRadius: "12px",
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Schedule Demo
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: { xs: 4, sm: 6 },
          borderTop: "1px solid rgba(255,255,255,0.05)",
          bgcolor: "rgba(10, 14, 23, 0.5)",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" }
                }}
              >
                Tasks<span style={{ color: "#00d4ff" }}>.</span>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  mb: 2,
                  fontSize: { xs: "0.85rem", sm: "0.9rem" }
                }}
              >
                The modern project management platform that helps teams ship faster and collaborate better.
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: "0.9rem", sm: "1rem" }
                }}
              >
                Product
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  mb: 1,
                  cursor: "pointer",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  "&:hover": { color: "#fff" }
                }}
              >
                Features
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  mb: 1,
                  cursor: "pointer",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  "&:hover": { color: "#fff" }
                }}
              >
                Pricing
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  mb: 1,
                  cursor: "pointer",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  "&:hover": { color: "#fff" }
                }}
              >
                Integrations
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: "0.9rem", sm: "1rem" }
                }}
              >
                Company
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  mb: 1,
                  cursor: "pointer",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  "&:hover": { color: "#fff" }
                }}
              >
                About
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  mb: 1,
                  cursor: "pointer",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  "&:hover": { color: "#fff" }
                }}
              >
                Blog
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  mb: 1,
                  cursor: "pointer",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  "&:hover": { color: "#fff" }
                }}
              >
                Careers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: "0.9rem", sm: "1rem" }
                }}
              >
                Stay Updated
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  mb: 2,
                  fontSize: { xs: "0.8rem", sm: "0.85rem" }
                }}
              >
                Get the latest updates and news from Tasks.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  py: { xs: 0.75, sm: 1 },
                  px: { xs: 2, sm: 3 },
                  "&:hover": {
                    borderColor: "#00d4ff",
                    color: "#00d4ff",
                  },
                }}
              >
                Subscribe to Newsletter
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: { xs: 3, sm: 4 }, bgcolor: "rgba(255,255,255,0.05)" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#a0aec0",
                fontSize: { xs: "0.75rem", sm: "0.8rem" }
              }}
            >
              © 2026 Tasks. All rights reserved.
            </Typography>
            <Box sx={{
              display: "flex",
              gap: { xs: 2, sm: 3 },
              flexWrap: "wrap",
              justifyContent: "center"
            }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  cursor: "pointer",
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  "&:hover": { color: "#fff" }
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#a0aec0",
                  cursor: "pointer",
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  "&:hover": { color: "#fff" }
                }}
              >
                Terms of Service
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
