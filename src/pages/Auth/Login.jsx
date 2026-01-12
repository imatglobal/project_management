import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { GlassContainer, GlowText } from "../../components/common/GlassComp";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";
import { useToast } from "../../context/ToastContext";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChnage = (e) => {
    try {
      const { name, value } = e.target;
      setformData((preve) => ({
        ...preve,
        [name]: value,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handle_submit = async () => {
    try {
      if (formData.email && formData.password) {
        const res = await axios.post("http://localhost:8080/login", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          showToast("Login successful!", "success");
          console.log(res.data);
          // navigate to dashboard
          setTimeout(() => {
            navigate("/app/gateway");
          }, 1000);
        }
      } else {
        showToast("Please fill in all fields", "warning");
      }
    } catch (error) {
      console.log(error);
      showToast("Login failed. Please check your credentials.", "error");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 50% 50%, #1a2035 0%, #0a0e17 100%)",
        p: 2,
      }}
    >
      <GlassContainer
        sx={{ maxWidth: 450, width: "100%", p: 5, textAlign: "center" }}
      >
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "16px",
              background: "linear-gradient(135deg, #00d4ff 0%, #005bea 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
              A
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#fff", mb: 1 }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: "#a0aec0" }}>
            Enter your credentials to access your workspace.
          </Typography>
        </Box>

        <TextField
          fullWidth
          required
          variant="outlined"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChnage}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
            },
            "& input": { color: "#fff" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#a0aec0" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          required
          variant="outlined"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChnage}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
            },
            "& input": { color: "#fff" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#a0aec0" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: "#a0aec0", "&.Mui-checked": { color: "#00d4ff" } }}
              />
            }
            label={
              <Typography variant="caption" sx={{ color: "#a0aec0" }}>
                Remember me
              </Typography>
            }
          />
          <Typography
            variant="caption"
            sx={{ color: "#00d4ff", cursor: "pointer" }}
          >
            Forgot Password?
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          type="submit"
          onClick={handle_submit}
          sx={{
            py: 1.5,
            fontSize: "1rem",
            background: "linear-gradient(135deg, #00d4ff 0%, #009bb3 100%)",
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
            "&:hover": {
              boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)",
            },
          }}
        >
          Sign In
        </Button>

        <Box sx={{ mt: 3, mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.1)", flex: 1 }}
            />
            <Typography variant="caption" sx={{ color: "#a0aec0" }}>
              OR
            </Typography>
            <Box
              sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.1)", flex: 1 }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={async () => {
                try {
                  const res = await axios.get(
                    "http://localhost:8080/auth/google"
                  );
                  console.log(res.data);
                } catch (error) {
                  console.log(error);
                  showToast("Google Login Failed", "error");
                }
              }}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.2)",
                "&:hover": {
                  borderColor: "#00d4ff",
                  bgcolor: "rgba(0, 212, 255, 0.05)",
                },
              }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GitHubIcon />}
              onClick={async () => {
                try {
                  const res = await axios.get(
                    "http://localhost:8080/auth/github"
                  );
                  console.log(res.data);
                } catch (error) {
                  console.log(error);
                  showToast("GitHub Login Failed", "error");
                }
              }}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.2)",
                "&:hover": {
                  borderColor: "#00d4ff",
                  bgcolor: "rgba(0, 212, 255, 0.05)",
                },
              }}
            >
              GitHub
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" sx={{ color: "#a0aec0" }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#00d4ff", fontWeight: 600, cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </Typography>
        </Box>
      </GlassContainer>
    </Box>
  );
};

export default Login;
