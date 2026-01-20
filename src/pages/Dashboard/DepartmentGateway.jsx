import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { GlassContainer } from "../../components/common/GlassComp";
import { useNavigate } from "react-router-dom";

const departments = [
  {
    id: "it",
    title: "IT Department",
    color: "#00d4ff",
    desc: "Technology & Infrastructure",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    color: "#ff4081",
    desc: "Growth & Campaigns",
  },
];

const DepartmentGateway = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments from server
    // Example: fetch('/api/departments').then(res => res.json()).then(data => setDepartments(data));
    // For now, using dummy data
    setDepartments([
      {
        id: "it",
        title: "IT Department",
        color: "#00d4ff",
        desc: "Technology & Infrastructure",
      },
      {
        id: "marketing",
        title: "Digital Marketing",
        color: "#ff4081",
        desc: "Growth & Campaigns",
      },
    ]);
  }, []);

  const handleEnter = (deptId) => {
    navigate(`/employee/cockpit/${deptId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 50%, #1a2035 0%, #0a0e17 100%)",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: "#fff", mb: 2 }}
          >
            Welcome to the Workspace
          </Typography>
          <Typography variant="h6" sx={{ color: "#a0aec0" }}>
            Select your department to access your dashboard
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {departments.map((dept) => (
            <Grid item xs={12} sm={6} md={4} key={dept.id}>
              <GlassContainer
                onClick={() => handleEnter(dept.id)}
                sx={{
                  p: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                  backdropFilter: "blur(20px)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(45deg, ${dept.color}20 0%, transparent 50%, ${dept.color}10 100%)`,
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  },
                  "&:hover": {
                    transform: "translateY(-15px) scale(1.05)",
                    boxShadow: `0 20px 40px ${dept.color}30, 0 0 60px ${dept.color}20`,
                    border: `2px solid ${dept.color}60`,
                    "&::before": {
                      opacity: 1,
                    },
                    "& .title": {
                      color: dept.color,
                      textShadow: `0 0 20px ${dept.color}80`,
                    },
                    "& .desc": {
                      color: "#e2e8f0",
                    },
                  },
                }}
              >
                <Typography
                  variant="h5"
                  className="title"
                  sx={{
                    fontWeight: 800,
                    color: "#fff",
                    mb: 2,
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {dept.title}
                </Typography>
                <Typography
                  variant="body1"
                  className="desc"
                  sx={{
                    color: "#a0aec0",
                    transition: "all 0.3s ease",
                    fontWeight: 500,
                  }}
                >
                  {dept.desc}
                </Typography>
              </GlassContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DepartmentGateway;
