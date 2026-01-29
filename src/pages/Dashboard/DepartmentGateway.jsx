import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Container, alpha, Avatar } from "@mui/material";
import { GlassContainer } from "../../components/common/GlassComp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Code as CodeIcon,
  Campaign as MarketingIcon,
  Groups as HRIcon,
  AccountBalance as FinanceIcon,
  DesignServices as DesignIcon,
  Business as GeneralIcon,
  ArrowForward as ArrowIcon,
} from "@mui/icons-material";

// Helper to get consistent styling based on department ID
const getDepartmentStyle = (deptId) => {
  const styles = {
    it: {
      color: "#00d4ff",
      gradient: "linear-gradient(135deg, #00d4ff 0%, #0056b3 100%)",
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      glow: "0 0 30px rgba(0, 212, 255, 0.3)",
    },
    marketing: {
      color: "#ff4081",
      gradient: "linear-gradient(135deg, #ff4081 0%, #c60055 100%)",
      icon: <MarketingIcon sx={{ fontSize: 40 }} />,
      glow: "0 0 30px rgba(255, 64, 129, 0.3)",
    },
    hr: {
      color: "#7c4dff",
      gradient: "linear-gradient(135deg, #7c4dff 0%, #3f1dcb 100%)",
      icon: <HRIcon sx={{ fontSize: 40 }} />,
      glow: "0 0 30px rgba(124, 77, 255, 0.3)",
    },
    finance: {
      color: "#00e676",
      gradient: "linear-gradient(135deg, #00e676 0%, #00a152 100%)",
      icon: <FinanceIcon sx={{ fontSize: 40 }} />,
      glow: "0 0 30px rgba(0, 230, 118, 0.3)",
    },
    design: {
      color: "#ff9100",
      gradient: "linear-gradient(135deg, #ff9100 0%, #c66900 100%)",
      icon: <DesignIcon sx={{ fontSize: 40 }} />,
      glow: "0 0 30px rgba(255, 145, 0, 0.3)",
    },
  };

  return (
    styles[deptId.toLowerCase()] || {
      color: "#a0aec0",
      gradient: "linear-gradient(135deg, #a0aec0 0%, #4a5568 100%)",
      icon: <GeneralIcon sx={{ fontSize: 40 }} />,
      glow: "0 0 30px rgba(160, 174, 192, 0.3)",
    }
  );
};

const DepartmentGateway = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  const getDepartments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/departments",
      );
      console.log(response.data);
      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const handleEnter = (deptId) => {
    navigate(`/employee/cockpit/${deptId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% 0%, #2a3555 0%, #0a0e17 80%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 10,
        pb: 6,
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decor */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "20%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(45deg, #fff 30%, #a0aec0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              letterSpacing: "-2px",
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            Select Your Workspace
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#a0aec0",
              fontWeight: 400,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Choose your department to access your personalized dashboard and
            team resources.
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {departments.map((dept) => {
            const style = getDepartmentStyle(dept.id);
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={dept.id}>
                <GlassContainer
                  onClick={() => handleEnter(dept.id)}
                  sx={{
                    height: "100%",
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: `linear-gradient(135deg, ${alpha("#ffffff", 0.03)} 0%, ${alpha("#ffffff", 0.01)} 100%)`,
                    backdropFilter: "blur(20px)",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: `0 20px 40px ${alpha(style.color, 0.15)}, inset 0 0 0 1px ${alpha(style.color, 0.3)}`,
                      "& .icon-wrapper": {
                        transform: "scale(1.1) rotate(5deg)",
                        background: style.gradient,
                        boxShadow: style.glow,
                        color: "#fff",
                      },
                      "& .arrow-icon": {
                        transform: "translateX(5px)",
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box
                      className="icon-wrapper"
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "20px",
                        background: alpha(style.color, 0.1),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: style.color,
                        mb: 3,
                        transition: "all 0.4s ease",
                      }}
                    >
                      {style.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#fff",
                        mb: 1.5,
                        letterSpacing: 0.5,
                      }}
                    >
                      {dept.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#a0aec0",
                        lineHeight: 1.6,
                        mb: 3,
                        minHeight: "3em",
                      }}
                    >
                      {dept.description ||
                        "Access departmental tools, track progress, and manage team workflows."}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mt: "auto",
                      pt: 2,
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <Typography
                      variant="button"
                      sx={{
                        color: style.color,
                        fontWeight: 600,
                        flexGrow: 1,
                        letterSpacing: 1,
                      }}
                    >
                      ENTER
                    </Typography>
                    <ArrowIcon
                      className="arrow-icon"
                      sx={{
                        color: style.color,
                        opacity: 0.5,
                        transition: "all 0.3s ease",
                        fontSize: 20,
                      }}
                    />
                  </Box>
                </GlassContainer>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default DepartmentGateway;
