import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  Avatar,
  IconButton,
  Chip,
} from "@mui/material";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  RocketLaunch as RocketIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  AutoAwesome as MagicIcon,
  Bolt as BoltIcon,
  Groups as TeamIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
  Menu as MenuIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { GlassContainer, GlowText } from "../components/common/GlassComp";

/* ─── Shared Animation/Layout Components ─── */
const FadeIn = ({ children, delay = 0, y = 20 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);
  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
};

/* ─── Navbar ─── */
const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        bgcolor: scrolled ? "rgba(10, 14, 23, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Logo */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                background: "linear-gradient(135deg, #00d4ff 0%, #005bea 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(0, 212, 255, 0.5)",
              }}
            >
              <BoltIcon sx={{ color: "#fff", fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, letterSpacing: -0.5, color: "#fff" }}
            >
              Tasks.
            </Typography>
          </Stack>

          {/* Desktop Nav */}
          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {["Features", "Solutions", "Enterprise", "Pricing"].map((item) => (
              <Typography
                key={item}
                sx={{
                  color: "#a0aec0",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s",
                  "&:hover": { color: "#fff" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="text"
              sx={{
                color: "#fff",
                fontWeight: 600,
                display: { xs: "none", sm: "block" },
              }}
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/signup")}
              sx={{
                background: "#fff",
                color: "#000",
                fontWeight: 700,
                borderRadius: "8px",
                px: 2.5,
                "&:hover": { background: "#e2e8f0" },
              }}
            >
              Get Started
            </Button>
            <IconButton
              sx={{ display: { xs: "block", md: "none" }, color: "#fff" }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

/* ─── Hero Visual (3D Dashboard) ─── */
const HeroVisual = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const rotateX = useTransform(scrollY, [0, 500], [20, 0]);

  return (
    <Box
      sx={{
        perspective: "1000px",
        mt: { xs: 8, md: 10 },
        mb: { xs: 10, md: 15 },
      }}
    >
      <motion.div
        style={{ y, rotateX, rotateY: -12, scale: 0.95 }}
        initial={{ opacity: 0, rotateX: 45, y: 100 }}
        animate={{ opacity: 1, rotateX: 20, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <GlassContainer
          sx={{
            width: "100%",
            maxWidth: 1100,
            mx: "auto",
            height: { xs: 300, md: 600 },
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(13, 17, 23, 0.6)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 50px 100px -20px rgba(0,0,0,0.5), 0 0 80px -10px rgba(0, 212, 255, 0.15)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* App Header Mockup */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#ff5f56",
                }}
              />
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#ffbd2e",
                }}
              />
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#27c93f",
                }}
              />
            </Stack>
            <Box
              sx={{
                flex: 1,
                height: 24,
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 1,
              }}
            />
          </Box>

          {/* Dashboard Content Mockup */}
          <Grid container sx={{ height: "100%" }}>
            {/* Sidebar */}
            <Grid
              item
              xs={2}
              sx={{
                borderRight: "1px solid rgba(255,255,255,0.05)",
                p: 2,
                display: { xs: "none", md: "block" },
              }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <Box
                  key={i}
                  sx={{
                    height: 20,
                    width: "80%",
                    bgcolor: "rgba(255,255,255,0.03)",
                    mb: 2,
                    borderRadius: 1,
                  }}
                />
              ))}
            </Grid>
            {/* Main Area */}
            <Grid item xs={12} md={10} sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
              >
                <Box
                  sx={{
                    width: 150,
                    height: 30,
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    width: 100,
                    height: 30,
                    bgcolor: "#00d4ff",
                    borderRadius: 1,
                  }}
                />
              </Box>
              <Grid container spacing={2}>
                {/* Simulated Kanban Columns */}
                {[0, 1, 2].map((col) => (
                  <Grid item xs={4} key={col}>
                    <Box
                      sx={{
                        height: 400,
                        bgcolor: "rgba(255,255,255,0.02)",
                        borderRadius: 2,
                        p: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 15,
                          bgcolor: "rgba(255,255,255,0.1)",
                          mb: 2,
                          borderRadius: 1,
                        }}
                      />
                      {[1, 2, 3].map((card) => (
                        <motion.div
                          key={card}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1 + col * 0.2 + card * 0.1 }}
                        >
                          <Box
                            sx={{
                              height: 80,
                              bgcolor: "rgba(255,255,255,0.05)",
                              mb: 1,
                              borderRadius: 2,
                              border: "1px solid rgba(255,255,255,0.05)",
                            }}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Floating Elements for 3D effect */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              zIndex: 10,
            }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <GlassContainer
              sx={{
                p: 2,
                border: "1px solid rgba(0,212,255,0.3)",
                bgcolor: "rgba(0,0,0,0.6)",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <CheckCircleIcon sx={{ color: "#27c93f" }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", fontWeight: 600 }}
                >
                  Deployment Successful
                </Typography>
              </Stack>
            </GlassContainer>
          </motion.div>
        </GlassContainer>
      </motion.div>
    </Box>
  );
};

/* ─── Main Landing Component ─── */
const Landing = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "#0a0e17",
        minHeight: "100vh",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 15, md: 22 }, position: "relative", zIndex: 2 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -100,
            left: "20%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(60px)",
            zIndex: -1,
          }}
        />

        <Stack alignItems="center" spacing={3} textAlign="center">
          <FadeIn>
            <Chip
              label="New: AI-Powered Workflows ⚡"
              sx={{
                bgcolor: "rgba(0, 212, 255, 0.1)",
                color: "#00d4ff",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                fontWeight: 600,
                mb: 2,
              }}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -1,
              }}
            >
              Manage projects with <br />
              <span
                style={{
                  background: "linear-gradient(to right, #00d4ff, #005bea)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Supernatural Speed
              </span>
            </Typography>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Typography
              variant="h5"
              sx={{
                color: "#a0aec0",
                maxWidth: 660,
                lineHeight: 1.6,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              The all-in-one workspace for high-performance teams. Plan, track,
              and ship world-class software without the chaos.
            </Typography>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#fff",
                  color: "#000",
                  fontSize: "1rem",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: "10px",
                  "&:hover": { bgcolor: "#e2e8f0" },
                }}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  borderRadius: "10px",
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                }}
              >
                View Demo
              </Button>
            </Stack>
          </FadeIn>
        </Stack>

        <HeroVisual />
      </Container>

      {/* Logos Marquee */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          py: 4,
          bgcolor: "rgba(255,255,255,0.01)",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="overline"
            display="block"
            align="center"
            sx={{ color: "#4a5568", mb: 3, letterSpacing: 2 }}
          >
            TRUSTED BY INDUSTRY LEADERS
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            spacing={{ xs: 3, md: 8 }}
          >
            {[
              "Acme Corp",
              "Linear",
              "Vercel",
              "Stripe",
              "Raycast",
              "Shopify",
            ].map((name) => (
              <Typography
                key={name}
                variant="h6"
                sx={{ color: "#4a5568", fontWeight: 700, opacity: 0.6 }}
              >
                {name}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Benefits Grid */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <FadeIn>
          <Typography
            variant="h2"
            align="center"
            sx={{ fontWeight: 800, mb: 2 }}
          >
            Built for modern workflows
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "#a0aec0", mb: 10, maxWidth: 600, mx: "auto" }}
          >
            Everything you need to manage complex projects without the
            complexity.
          </Typography>
        </FadeIn>

        <Grid container spacing={4}>
          {[
            {
              icon: <SpeedIcon sx={{ fontSize: 40, color: "#00d4ff" }} />,
              title: "Real-time Sync",
              desc: "Updates happen instantly across all devices. No refresh needed.",
            },
            {
              icon: <BoltIcon sx={{ fontSize: 40, color: "#f4bf50" }} />,
              title: "Automated Actions",
              desc: "Create custom rules to automate repetitive tasks and save time.",
            },
            {
              icon: <SecurityIcon sx={{ fontSize: 40, color: "#27c93f" }} />,
              title: "Enterprise Security",
              desc: "Bank-grade encryption and SSO support for your peace of mind.",
            },
            {
              icon: <RocketIcon sx={{ fontSize: 40, color: "#ff5f56" }} />,
              title: "Fast Deployment",
              desc: "Set up in minutes, not days. Import from Jira or Trello instantly.",
            },
            {
              icon: <TeamIcon sx={{ fontSize: 40, color: "#a78bfa" }} />,
              title: "Team Velocity",
              desc: "Track sprint progress and team performance with beautiful charts.",
            },
            {
              icon: <MagicIcon sx={{ fontSize: 40, color: "#ec4899" }} />,
              title: "AI Assistant",
              desc: "Let AI write your release notes and summarize daily standups.",
            },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <FadeIn delay={i * 0.1}>
                <GlassContainer
                  sx={{
                    height: "100%",
                    p: 4,
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#a0aec0", lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </Typography>
                </GlassContainer>
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box
        sx={{
          py: 15,
          bgcolor: "rgba(0, 212, 255, 0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              { val: 10000, label: "Active Users", suffix: "+" },
              { val: 500, label: "Companies", suffix: "+" },
              { val: 99, label: "Uptime", suffix: ".9%" },
            ].map((stat, i) => (
              <Grid item xs={12} md={4} key={i} sx={{ textAlign: "center" }}>
                <FadeIn delay={i * 0.2}>
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: 800, color: "#fff", mb: 1 }}
                  >
                    <AnimatedCounter target={stat.val} suffix={stat.suffix} />
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#a0aec0" }}>
                    {stat.label}
                  </Typography>
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}>
        <FadeIn>
          <Box
            sx={{
              position: "relative",
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              overflow: "hidden",
              background:
                "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0,0,0,0) 100%)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
              Ready to ship faster?
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#a0aec0", mb: 5, maxWidth: 500, mx: "auto" }}
            >
              Join thousands of developers using Tasks to build the future.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#00d4ff",
                color: "#000",
                fontSize: "1.2rem",
                fontWeight: 700,
                px: 6,
                py: 2,
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#33dcff",
                  boxShadow: "0 0 30px rgba(0, 212, 255, 0.4)",
                },
              }}
            >
              Get Started for Free
            </Button>
          </Box>
        </FadeIn>
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.05)", py: 8 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={4}
          >
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "6px",
                    background: "#00d4ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BoltIcon sx={{ color: "#fff", fontSize: 16 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Tasks.
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ color: "#a0aec0", maxWidth: 300 }}
              >
                The modern project management platform for software teams.
              </Typography>
            </Box>
            <Stack direction="row" spacing={8}>
              <Stack spacing={2}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#fff", fontWeight: 700 }}
                >
                  Product
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#a0aec0", cursor: "pointer" }}
                >
                  Features
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#a0aec0", cursor: "pointer" }}
                >
                  Ingetrations
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#a0aec0", cursor: "pointer" }}
                >
                  Changelog
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#fff", fontWeight: 700 }}
                >
                  Company
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#a0aec0", cursor: "pointer" }}
                >
                  About
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#a0aec0", cursor: "pointer" }}
                >
                  Careers
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#a0aec0", cursor: "pointer" }}
                >
                  Blog
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#4a5568", mt: 8 }}
          >
            © 2026 Tasks Inc. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
