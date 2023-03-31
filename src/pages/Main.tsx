import { FC } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
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
      <Container component="main" maxWidth='lg'>
        <Table />
      </Container>
      <Footer />
    </Box>
  );
};
