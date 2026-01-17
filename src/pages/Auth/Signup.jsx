import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { GlassContainer } from "../../components/common/GlassComp";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../../context/ToastContext";
import { MenuItem } from "@mui/material";

const departments = ["IT", "Digital Marketing"];
const Signup = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formdatas = new FormData();
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const handlechange = (e) => {
    try {
      const { name, value } = e.target;
      setformdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const formsubmition = async () => {
    try {
      console.log(formdata);
      if (
        formdata.email &&
        formdata.name &&
        formdata.password &&
        formdata.department
      ) {
        const res = await axios.post("http://localhost:8080/signup", formdata, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          console.log(res.data);
          showToast("Account created successfully!", "success");
          // navigate to dashboard or login
          setTimeout(() => {
            navigate("/app/gateway");
          }, 1000);
        }
      } else {
        showToast("Please fill in all fields", "warning");
      }
    } catch (error) {
      console.log(error);
      showToast("Signup failed", "error");
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
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#fff", mb: 1 }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: "#a0aec0" }}>
            Join start managing projects.
          </Typography>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          type="name"
          placeholder="Full Name"
          name="name"
          value={formdata.name}
          onChange={handlechange}
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
                <PersonIcon sx={{ color: "#a0aec0" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          type="email"
          placeholder="Email Address"
          name="email"
          value={formdata.email}
          onChange={handlechange}
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
          select
          fullWidth
          variant="outlined"
          displayEmpty
          name="department"
          value={formdata.department}
          onChange={handlechange}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
              "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
            },
            "& .MuiSelect-select": {
              color: formdata.department ? "#fff" : "#a0aec0",
              textAlign: "left",
            },
            "& .MuiSvgIcon-root": { color: "#a0aec0" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WorkIcon sx={{ color: "#a0aec0" }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="" disabled>
            Select Department
          </MenuItem>
          {departments.map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder="Password"
          name="password"
          value={formdata.password}
          onChange={handlechange}
          sx={{
            mb: 4,
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

        <Button
          variant="contained"
          fullWidth
          size="large"
          type="submit"
          onClick={formsubmition}
          sx={{
            py: 1.5,
            fontSize: "1rem",
            background: "linear-gradient(135deg, #00d4ff 0%, #009bb3 100%)",
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
            "&:hover": {
              boxShadow: "0 0 30px rgba(20, 20, 20, 0.6)",
            },
          }}
        >
          Get Started
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
                  window.location.href = "http://localhost:8080/google/auth";

                } catch (error) {
                  console.log(error);
                  showToast("Google Signup Failed", "error");
                }
              }}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.2)",
                "&:hover": {
                  borderColor: "#0b0d0d",
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
                  window.location.href = "http://localhost:8080/oauth2/github";
                } catch (error) {
                  console.log(error);
                  showToast("GitHub Signup Failed", "error");
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
            Already have an account?{" "}
            <span
              style={{ color: "#00d4ff", fontWeight: 600, cursor: "pointer" }}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </GlassContainer>
    </Box>
  );
};

export default Signup;
