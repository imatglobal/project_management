import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useToast } from "../../context/ToastContext"; // Assuming this context exists from previous files or needed

const WorkReportForm = ({ deptId }) => {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  // Safe toast usage
  let showToast = (msg, type) => console.log(msg, type);
  try {
    const toast = useToast();
    showToast = toast.showToast;
  } catch (e) {
    /* ignore if context missing */
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!report.trim()) return;

    setLoading(true);
    try {
      // Modified endpoint as per requirements: /admin/add_task (modified for reports)
      // Assuming structure matches what the backend expects
      await axios.post("http://localhost:8080/admin/add_task", {
        title: "Daily Work Report",
        desc: report,
        deptId: deptId,
        type: "report",
        date: new Date().toISOString(),
      });
      showToast("Report submitted successfully", "success");
      setReport("");
    } catch (error) {
      console.error("Failed to submit report", error);
      showToast("Failed to submit report", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        background: "rgba(20, 25, 40, 0.6)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#fff" }}>
        Daily Work Report
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="What did you accomplish today?"
        value={report}
        onChange={(e) => setReport(e.target.value)}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            bgcolor: "rgba(255,255,255,0.02)",
            "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
            "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
            "&.Mui-focused fieldset": { borderColor: "#00d4ff" },
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
          sx={{
            background: "linear-gradient(135deg, #00d4ff 0%, #009bb3 100%)",
            color: "#fff",
            fontWeight: 600,
            px: 4,
            "&.Mui-disabled": {
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.3)",
            },
          }}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </Button>
      </Box>
    </Paper>
  );
};

export default WorkReportForm;
