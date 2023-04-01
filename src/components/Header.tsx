import { FC, useState, MouseEvent } from 'react';
import { Logout } from '@mui/icons-material';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Avatar, 
  MenuItem, 
  Tooltip, 
  IconButton, 
  Menu, 
  ListItemIcon,
  Box
} from '@mui/material';

export const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);
  
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <AppBar position='relative' sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h5'>
          Pryaniky
        </Typography>
        <Box>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar src="/broken-image.jpg" sx={{ width: 30, height: 30 }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
