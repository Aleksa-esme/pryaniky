import { FC } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Table, Header, Footer } from 'components';

export const Main: FC = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Header />
      <Table />
      <Footer />
    </Box>
  );
};
