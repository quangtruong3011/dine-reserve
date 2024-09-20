import { IconButton, ListItemIcon, ListItemText, MenuItem, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import { Logout } from "@mui/icons-material";

const accountMenu = [
    {
        title: 'Profile',
        href: '/profile',
        icon: <AccountCircle />
    },
    {
        title:'Logout',
        href: '/logout',
        icon: <Logout />
    }
]

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Fragment>
            <Tooltip title="Account settings">
                <IconButton
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <AccountCircle />
                </IconButton>
            </Tooltip>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {accountMenu.map((item, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                        <ListItemIcon fontsize='small'>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    )
}

export default UserMenu