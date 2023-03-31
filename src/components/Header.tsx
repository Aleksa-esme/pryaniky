import { FC } from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

export const Header: FC = () => {

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h5">
          Pryaniky
        </Typography>
        {/* <div>
          <Typography variant='h6'>
            User
          </Typography>
          <Avatar src="/broken-image.jpg" />
        </div> */}
      </Toolbar>
    </AppBar>
  );
};
