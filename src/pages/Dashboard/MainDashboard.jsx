import React from 'react';
import { Grid, Typography, Box, Avatar, LinearProgress } from '@mui/material';
import { GlassContainer, GlowText } from '../../components/common/GlassComp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StatCard = ({ title, value, increase, icon, color }) => (
    <GlassContainer sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -20, right: -20, opacity: 0.1, transform: 'rotate(20deg)' }}>
            {React.cloneElement(icon, { sx: { fontSize: 120, color } })}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
                <Typography variant="body2" sx={{ color: '#a0aec0', mb: 0.5 }}>{title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>{value}</Typography>
            </Box>
            <Box
                sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`,
                    color: color,
                    display: 'flex',
                    boxShadow: `0 0 15px ${color}33`
                }}>
                {icon}
            </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
                bgcolor: 'rgba(56, 178, 172, 0.2)',
                color: '#4fd1c5',
                px: 1,
                py: 0.2,
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
            }}>
                <TrendingUpIcon sx={{ fontSize: 14 }} /> {increase}
            </Box>
            <Typography variant="caption" sx={{ color: '#718096' }}>vs last month</Typography>
        </Box>
    </GlassContainer>
);

const ProjectRow = ({ name, status, progress, users, deadline }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '30%' }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" sx={{ fontSize: '1rem' }}>🚀</Typography>
            </Box>
            <Box>
                <Typography variant="subtitle2" sx={{ color: '#fff' }}>{name}</Typography>
                <Typography variant="caption" sx={{ color: '#a0aec0' }}>Web Development</Typography>
            </Box>
        </Box>

        <Box sx={{ width: '15%' }}>
            <Box
                sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '20px',
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    ...(status === 'In Progress' && { bgcolor: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.2)' }),
                    ...(status === 'Completed' && { bgcolor: 'rgba(72, 187, 120, 0.15)', color: '#48bb78', border: '1px solid rgba(72, 187, 120, 0.2)' }),
                    ...(status === 'Delayed' && { bgcolor: 'rgba(245, 101, 101, 0.15)', color: '#f56565', border: '1px solid rgba(245, 101, 101, 0.2)' }),
                }}
            >
                {status}
            </Box>
        </Box>

        <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#a0aec0' }}>Progress</Typography>
                <Typography variant="caption" sx={{ color: '#fff' }}>{progress}%</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #00d4ff, #005bea)',
                        borderRadius: 3,
                        boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                    }
                }}
            />
        </Box>

        <Box sx={{ width: '15%' }}>
            <Box sx={{ display: 'flex', pl: 1 }}>
                {users.map((u, i) => (
                    <Avatar
                        key={i}
                        src={u}
                        sx={{
                            width: 30,
                            height: 30,
                            border: '2px solid #131926',
                            ml: -1,
                            fontSize: '0.8rem',
                            bgcolor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                        }}
                    >
                        {u ? null : 'U'}
                    </Avatar>
                ))}
                {users.length > 3 && (
                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', bgcolor: '#2d3748', border: '2px solid #131926', ml: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff' }}>+2</Box>
                )}
            </Box>
        </Box>

        <Box sx={{ width: '10%', textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: '#fff' }}>{deadline}</Typography>
        </Box>
    </Box>
);

const MainDashboard = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                    Welcome back, <GlowText>Alkor</GlowText> 👋
                </Typography>
                <Typography variant="body1" sx={{ color: '#a0aec0' }}>
                    Here's what's happening with your projects today.
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Projects" value="12" increase="+2" icon={<AssignmentTurnedInIcon />} color="#00d4ff" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Active Tasks" value="48" increase="+12" icon={<AccessTimeIcon />} color="#b721ff" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Team Members" value="24" increase="+4" icon={<GroupIcon />} color="#f6ad55" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Productivity" value="92%" increase="+5%" icon={<TrendingUpIcon />} color="#48bb78" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <GlassContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>Active Projects</Typography>
                            <Typography variant="body2" sx={{ color: '#00d4ff', cursor: 'pointer' }}>View All</Typography>
                        </Box>
                        <Box>
                            <ProjectRow name="Website Redesign" status="In Progress" progress={65} users={['', '', '']} deadline="Oct 24, 2025" />
                            <ProjectRow name="Mobile App" status="Delayed" progress={30} users={['', '']} deadline="Nov 12, 2025" />
                            <ProjectRow name="Dashboard UI" status="Completed" progress={100} users={['', '', '', '']} deadline="Sep 10, 2025" />
                            <ProjectRow name="API Integration" status="In Progress" progress={45} users={['']} deadline="Dec 05, 2025" />
                        </Box>
                    </GlassContainer>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <GlassContainer sx={{ height: '100%' }}>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>Recent Activity</Typography>
                        {[1, 2, 3, 4].map((item, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 2, mb: 3, position: 'relative' }}>
                                <Box sx={{
                                    width: 2,
                                    height: '100%',
                                    position: 'absolute',
                                    left: 19,
                                    top: 30,
                                    bgcolor: index === 3 ? 'transparent' : 'rgba(255,255,255,0.05)'
                                }} />
                                <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.05)', color: '#00d4ff' }}>
                                    <AssignmentTurnedInIcon sx={{ fontSize: 20 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#fff' }}>
                                        <span style={{ fontWeight: 600 }}>Sarah</span> moved <span style={{ color: '#00d4ff' }}>Task #342</span> to Done
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#a0aec0' }}>2 hours ago</Typography>
                                </Box>
                            </Box>
                        ))}
                    </GlassContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MainDashboard;
