import { FC } from 'react';
import { Box, Typography } from '@mui/material';

export const Footer: FC = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        mt: 'auto',
        bgcolor: 'primary.main'
      }}
    >
      <Typography 
        component='p' 
        color='#fff' 
        sx={{ textAlign: 'center' }}
      >
        Pryaniky&nbsp;&copy;
      </Typography>
    </Box>
  );
}

