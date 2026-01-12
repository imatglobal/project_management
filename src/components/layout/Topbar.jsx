import React, { useState } from 'react';
import { AppBar, Toolbar, Box, InputBase, IconButton, Badge, Typography, Menu, MenuItem, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: alpha(theme.palette.common.white, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.2s',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

const Topbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: 70 }}>
                {/* Left side spacer to align with content since sidebar is permanent */}
                <Box />

                {/* Center Search */}
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search projects, tasks, or team members..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                {/* Right Icons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error" sx={{ '& .MuiBadge-badge': { background: '#ff5b5b' } }}>
                            <EmailIcon />
                        </Badge>
                    </IconButton>

                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={12} color="primary" sx={{ '& .MuiBadge-badge': { background: '#00d4ff', color: '#000' } }}>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <Box
                        onClick={handleMenuClick}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            ml: 2,
                            p: 0.5,
                            pr: 1.5,
                            borderRadius: '20px',
                            '&:hover': { background: 'rgba(255,255,255,0.05)' }
                        }}
                    >
                        <Avatar
                            sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                            src="/path-to-avatar.jpg"
                        >
                            A
                        </Avatar>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
