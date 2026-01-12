import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { GlassContainer } from "../../components/common/GlassComp";
import { useNavigate } from "react-router-dom";
import ComputerIcon from "@mui/icons-material/Computer";
import CampaignIcon from "@mui/icons-material/Campaign";

const departments = [
  {
    id: "it",
    title: "IT Department",
    icon: <ComputerIcon sx={{ fontSize: 60 }} />,
    color: "#00d4ff",
    desc: "Technology & Infrastructure",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: <CampaignIcon sx={{ fontSize: 60 }} />,
    color: "#ff4081",
    desc: "Growth & Campaigns",
  },
];

const DepartmentGateway = () => {
  const navigate = useNavigate();

  const handleEnter = (deptId) => {
    navigate(`/app/department/${deptId}`);
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
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(255,255,255,0.05)",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: `0 0 30px ${dept.color}40`,
                    border: `1px solid ${dept.color}`,
                    "& .icon-box": {
                      transform: "scale(1.1)",
                      color: dept.color,
                    },
                  },
                }}
              >
                <Box
                  className="icon-box"
                  sx={{
                    color: "#fff",
                    mb: 2,
                    transition: "all 0.3s ease",
                    display: "inline-block",
                  }}
                >
                  {dept.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: "#fff", mb: 1 }}
                >
                  {dept.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#a0aec0" }}>
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
