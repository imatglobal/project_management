import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Chip,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessIcon from "@mui/icons-material/Business";
import ReportIcon from "@mui/icons-material/Report";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FolderIcon from "@mui/icons-material/Folder";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BlockIcon from "@mui/icons-material/Block";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";

const HRDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [reports, setReports] = useState([]);
  const [logs, setLogs] = useState([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openDeptDialog, setOpenDeptDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingDept, setEditingDept] = useState(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    active: true,
  });
  const [deptForm, setDeptForm] = useState({ name: "", description: "" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUsers(),
        fetchDepartments(),
        fetchReports(),
        fetchLogs(),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/users");
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/hr/departments");
      setDepartments(res.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/hr/reports");
      setReports(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/hr/logs");
      setLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUserDialogOpen = (user = null) => {
    setEditingUser(user);
    setUserForm(
      user
        ? { ...user }
        : { name: "", email: "", department: "", password: "", active: true },
    );
    setOpenUserDialog(true);
  };

  const handleUserDialogClose = () => {
    setOpenUserDialog(false);
    setEditingUser(null);
  };

  const handleDeptDialogOpen = (dept = null) => {
    setEditingDept(dept);
    setDeptForm(dept ? { ...dept } : { name: "", description: "" });
    setOpenDeptDialog(true);
  };

  const handleDeptDialogClose = () => {
    setOpenDeptDialog(false);
    setEditingDept(null);
  };

  const handleUserSubmit = async () => {
    try {
      if (editingUser) {
        const { password, ...updateData } = userForm;
        let id = editingUser._id;
        await axios.put(
          `http://localhost:8080/admin/updateEmploye/${id}`,
          updateData,
        );
        console.log(updateData);
      } else {
        // console.log(userForm);
        await axios
          .post("http://localhost:8080/admin/employes", userForm)
          .then((res) => {
            console.log(res.data);
            setAlertMessage(`User ${userForm.name} added successfully`);
            setAlertOpen(true);
          });
      }
      fetchUsers();
      handleUserDialogClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDeptSubmit = async () => {
    try {
      if (editingDept) {
        await axios.put(
          `http://localhost:8080/hr/departments/${editingDept.id}`,
          deptForm,
        );
      } else {
        await axios
          .post("http://localhost:8080/admin/departments", deptForm)
          .then((res) => console.log(res.data));
      }
      fetchDepartments();
      handleDeptDialogClose();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`http://localhost:8080/hr/users/${userId}`, {
        active: !currentStatus,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      try {
        await axios
          .delete(`http://localhost:8080/admin/deleteEmp/${userToDelete._id}`)
          .then((res) => {
            console.log(res.data);
            // Remove user from UI immediately
            setUsers(users.filter((u) => u._id !== userToDelete._id));
            // Show success alert
            setAlertMessage(`User ${userToDelete.name} deleted successfully`);
            setAlertOpen(true);
            // Auto-close alert after 3 seconds
            setTimeout(() => setAlertOpen(false), 3000);
          });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const cancelDeleteUser = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteDept = async (deptId) => {
    try {
      // console.log(deptId)
      await axios.delete(`http://localhost:8080/hr/departments/${deptId}`);
      fetchDepartments();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 1, sm: 2, md: 3, lg: 4 },
        background: "radial-gradient(circle at top, #0f172a 0%, #020617 70%)",
        color: "#e5e7eb",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mb: { xs: 2, md: 4 },
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
          background: "linear-gradient(135deg, #00d4ff, #4ade80)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
        }}
      >
        HR Dashboard
      </Typography>

      {alertOpen && (
        <Alert
          severity="success"
          onClose={() => setAlertOpen(false)}
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      )}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress sx={{ color: "#00d4ff" }} size={60} />
          <Typography sx={{ ml: 2, color: "#94a3b8" }}>
            Loading dashboard data...
          </Typography>
        </Box>
      ) : (
        <>
          {/* Dashboard Stats */}
          <Grid container spacing={3} sx={{ mb: 4, justifyContent: "center" }}>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                  },
                  borderRadius: 3,
                  minHeight: 120,
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <PeopleIcon sx={{ fontSize: { xs: 32, md: 40 }, mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                  >
                    {users.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
                  >
                    Total Users
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(240, 147, 251, 0.3)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px rgba(240, 147, 251, 0.4)",
                  },
                  borderRadius: 3,
                  minHeight: 120,
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <CheckCircleIcon
                    sx={{ fontSize: { xs: 32, md: 40 }, mb: 1 }}
                  />
                  <Typography
                    variant="h4"
                    sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                  >
                    {users.filter((u) => u.active).length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
                  >
                    Active Users
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(79, 172, 254, 0.3)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px rgba(79, 172, 254, 0.4)",
                  },
                  borderRadius: 3,
                  minHeight: 120,
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <FolderIcon sx={{ fontSize: { xs: 32, md: 40 }, mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                  >
                    {departments.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
                  >
                    Departments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(67, 233, 123, 0.3)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px rgba(67, 233, 123, 0.4)",
                  },
                  borderRadius: 3,
                  minHeight: 120,
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <AssessmentIcon
                    sx={{ fontSize: { xs: 32, md: 40 }, mb: 1 }}
                  />
                  <Typography
                    variant="h4"
                    sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                  >
                    {reports.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
                  >
                    Reports
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(250, 112, 154, 0.3)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 40px rgba(250, 112, 154, 0.4)",
                  },
                  borderRadius: 3,
                  minHeight: 120,
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <ScheduleIcon sx={{ fontSize: { xs: 32, md: 40 }, mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                  >
                    {logs.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
                  >
                    Log Entries
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              mb: 4,
              "& .MuiTab-root": { color: "#94a3b8" },
              "& .Mui-selected": { color: "#00d4ff" },
            }}
          >
            <Tab icon={<PersonAddIcon />} label="User Management" />
            <Tab icon={<BusinessIcon />} label="Departments" />
            <Tab icon={<ReportIcon />} label="Reports" />
            <Tab icon={<AccessTimeIcon />} label="Employee Logs" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h5">User Accounts</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleUserDialogOpen()}
                  sx={{
                    background: "linear-gradient(135deg, #00d4ff, #4ade80)",
                  }}
                >
                  Add User
                </Button>
              </Box>
              <TableContainer
                component={Paper}
                sx={{
                  background: "#1a1f3a",
                  color: "#e5e7eb",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  "&::-webkit-scrollbar": {
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#0f172a",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#667eea",
                    borderRadius: "4px",
                  },
                }}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow
                      sx={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "#e5e7eb",
                          fontWeight: "bold",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#e5e7eb",
                          fontWeight: "bold",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#e5e7eb",
                          fontWeight: "bold",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          display: { xs: "none", md: "table-cell" },
                        }}
                      >
                        Department
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#e5e7eb",
                          fontWeight: "bold",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          display: { xs: "none", sm: "table-cell" },
                        }}
                      >
                        Role
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#e5e7eb",
                          fontWeight: "bold",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#e5e7eb",
                          fontWeight: "bold",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user.id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#0f172a",
                            transform: "scale(1.01)",
                            transition: "all 0.2s ease-in-out",
                          },
                          borderBottom: "1px solid #374151",
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        <TableCell
                          sx={{
                            color: "#e5e7eb",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                          }}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#e5e7eb",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                          }}
                        >
                          {user.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#e5e7eb",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            display: { xs: "none", md: "table-cell" },
                          }}
                        >
                          {user.department}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#e5e7eb",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            display: { xs: "none", sm: "table-cell" },
                          }}
                        >
                          {user.role}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.active ? "Active" : "Inactive"}
                            color={user.active ? "success" : "error"}
                            size="small"
                            sx={{
                              fontWeight: "bold",
                              fontSize: { xs: "0.75rem", md: "0.875rem" },
                              transition: "all 0.2s ease-in-out",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}
                          >
                            <IconButton
                              onClick={() => handleUserDialogOpen(user)}
                              sx={{
                                color: "#00d4ff",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 212, 255, 0.1)",
                                },
                              }}
                              title="Edit User"
                            >
                              <EditIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                handleToggleUserStatus(user.id, user.active)
                              }
                              sx={{
                                color: user.active ? "#ff4d4f" : "#4ade80",
                                "&:hover": {
                                  backgroundColor: user.active
                                    ? "rgba(255, 77, 79, 0.1)"
                                    : "rgba(74, 222, 128, 0.1)",
                                },
                              }}
                              title={
                                user.active
                                  ? "Deactivate User"
                                  : "Activate User"
                              }
                            >
                              {user.active ? (
                                <BlockIcon
                                  sx={{ fontSize: { xs: 20, md: 24 } }}
                                />
                              ) : (
                                <CheckCircleIcon
                                  sx={{ fontSize: { xs: 20, md: 24 } }}
                                />
                              )}
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteUser(user)}
                              sx={{
                                color: "#ff4d4f",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 77, 79, 0.1)",
                                },
                              }}
                              title="Delete User"
                            >
                              <DeleteIcon
                                sx={{ fontSize: { xs: 20, md: 24 } }}
                              />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h5">Departments</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleDeptDialogOpen()}
                  sx={{
                    background: "linear-gradient(135deg, #00d4ff, #4ade80)",
                  }}
                >
                  Add Department
                </Button>
              </Box>
              <Grid container spacing={3}>
                {departments.map((dept) => (
                  <Grid item xs={12} sm={6} md={4} key={dept.id}>
                    <Card sx={{ background: "#1a1f3a", color: "#e5e7eb" }}>
                      <CardContent>
                        <Typography variant="h6">{dept.name}</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {dept.description}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            size="small"
                            onClick={() => handleDeptDialogOpen(dept)}
                            sx={{ color: "#00d4ff" }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            onClick={() => handleDeleteDept(dept)}
                            sx={{ color: "#ff4d4f" }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Daily Reports
              </Typography>
              {departments.map((dept) => (
                <Accordion
                  key={dept.id}
                  sx={{ background: "#1a1f3a", color: "#e5e7eb", mb: 2 }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#00d4ff" }} />}
                  >
                    <Typography>{dept.name} Reports</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {reports
                      .filter((report) => report.departmentId === dept.id)
                      .map((report) => (
                        <Card
                          key={report.id}
                          sx={{ mb: 2, background: "#0f172a" }}
                        >
                          <CardContent>
                            <Typography variant="h6">
                              {report.employeeName}
                            </Typography>
                            <Typography variant="body2">
                              {report.content}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#94a3b8" }}
                            >
                              {new Date(report.date).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}

          {tabValue === 3 && (
            <Box>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Employee Login/Logout Logs
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ background: "#1a1f3a", color: "#e5e7eb" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#e5e7eb" }}>Employee</TableCell>
                      <TableCell sx={{ color: "#e5e7eb" }}>
                        Login Time
                      </TableCell>
                      <TableCell sx={{ color: "#e5e7eb" }}>
                        Logout Time
                      </TableCell>
                      <TableCell sx={{ color: "#e5e7eb" }}>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell sx={{ color: "#e5e7eb" }}>
                          {log.employeeName}
                        </TableCell>
                        <TableCell sx={{ color: "#e5e7eb" }}>
                          {new Date(log.loginTime).toLocaleString()}
                        </TableCell>
                        <TableCell sx={{ color: "#e5e7eb" }}>
                          {log.logoutTime
                            ? new Date(log.logoutTime).toLocaleString()
                            : "Still logged in"}
                        </TableCell>
                        <TableCell sx={{ color: "#e5e7eb" }}>
                          {log.duration
                            ? `${Math.floor(log.duration / 60)}h ${log.duration % 60}m`
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* User Dialog */}
          <Dialog
            open={openUserDialog}
            onClose={handleUserDialogClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{ background: "#1a1f3a", color: "#e5e7eb" }}>
              {editingUser ? "Edit User" : "Add User"}
            </DialogTitle>
            <DialogContent sx={{ background: "#1a1f3a" }}>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  value={userForm.name}
                  onChange={(e) =>
                    setUserForm({ ...userForm, name: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ sx: { color: "#94a3b8" } }}
                  inputProps={{ sx: { color: "#e5e7eb" } }}
                />
                <TextField
                  label="Email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ sx: { color: "#94a3b8" } }}
                  inputProps={{ sx: { color: "#e5e7eb" } }}
                />
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "#94a3b8" }}>Department</InputLabel>
                  <Select
                    value={userForm.department}
                    onChange={(e) =>
                      setUserForm({ ...userForm, department: e.target.value })
                    }
                    sx={{ color: "#e5e7eb" }}
                  >
                    {/* {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </MenuItem>
                ))} */}
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="DM">DM</MenuItem>
                  </Select>
                </FormControl>
                {!editingUser && (
                  <TextField
                    label="password"
                    value={userForm.password}
                    onChange={(e) =>
                      setUserForm({ ...userForm, password: e.target.value })
                    }
                    fullWidth
                    InputLabelProps={{ sx: { color: "#94a3b8" } }}
                    inputProps={{ sx: { color: "#e5e7eb" } }}
                  />
                )}
                <Button
                  onClick={handleUserSubmit}
                  variant="contained"
                  sx={{ background: "#00d4ff" }}
                >
                  {editingUser ? "Update" : "Create"}
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>

          {/* Department Dialog */}
          <Dialog
            open={openDeptDialog}
            onClose={handleDeptDialogClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{ background: "#1a1f3a", color: "#e5e7eb" }}>
              {editingDept ? "Edit Department" : "Add Department"}
            </DialogTitle>
            <DialogContent sx={{ background: "#1a1f3a" }}>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  value={deptForm.name}
                  onChange={(e) =>
                    setDeptForm({ ...deptForm, name: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ sx: { color: "#94a3b8" } }}
                  inputProps={{ sx: { color: "#e5e7eb" } }}
                />
                <TextField
                  label="Description"
                  value={deptForm.description}
                  onChange={(e) =>
                    setDeptForm({ ...deptForm, description: e.target.value })
                  }
                  fullWidth
                  multiline
                  rows={3}
                  InputLabelProps={{ sx: { color: "#94a3b8" } }}
                  inputProps={{ sx: { color: "#e5e7eb" } }}
                />
                <Button
                  onClick={handleDeptSubmit}
                  variant="contained"
                  sx={{ background: "#00d4ff" }}
                >
                  {editingDept ? "Update" : "Create"}
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={cancelDeleteUser}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                background: "linear-gradient(135deg, #1a1f3a 0%, #0f172a 100%)",
                borderRadius: 3,
                border: "1px solid #374151",
              },
            }}
          >
            <DialogTitle
              sx={{
                color: "#e5e7eb",
                textAlign: "center",
                pb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <WarningIcon sx={{ fontSize: 48, color: "#ff4d4f", mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Confirm Deletion
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center", pb: 3 }}>
              <Typography variant="body1" sx={{ color: "#94a3b8", mb: 3 }}>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </Typography>
              {userToDelete && (
                <Box
                  sx={{
                    background: "#0f172a",
                    p: 2,
                    borderRadius: 2,
                    mb: 3,
                    border: "1px solid #374151",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#e5e7eb", mb: 1 }}>
                    {userToDelete.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    {userToDelete.email}
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  onClick={cancelDeleteUser}
                  variant="outlined"
                  sx={{
                    color: "#94a3b8",
                    borderColor: "#374151",
                    "&:hover": {
                      borderColor: "#94a3b8",
                      backgroundColor: "rgba(148, 163, 184, 0.1)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDeleteUser}
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(135deg, #ff4d4f 0%, #ff6b6b 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #ff6b6b 0%, #ff4d4f 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(255, 77, 79, 0.4)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  Delete User
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default HRDashboard;
