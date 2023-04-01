import { FC, FormEvent, useState } from 'react';
import { CssBaseline, Box, Button, Container } from '@mui/material';
import { Table, Header, Footer, Modal } from 'components';
import { useAppDispatch } from 'hooks';
import { sendData } from 'controllers/tableController';

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const data = {
      companySigDate: new Date(),
      companySignatureName: formData.get('companySignatureName') as string,
      documentName: formData.get('documentName') as string,
      documentStatus: formData.get('documentStatus') as string,
      documentType: formData.get('documentType') as string,
      employeeNumber: formData.get('employeeNumber') as string,
      employeeSigDate: new Date(),
      employeeSignatureName: formData.get('employeeSignatureName') as string,
    };

    dispatch(sendData(data));
    handleClose();
  }

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
      <Container component='div' sx={{ marginLeft: '20px'}}>
        <Button
          type='submit'
          variant='contained'
          sx={{ mt: 1, marginRight: '20px' }}
          size='large'
          onClick={handleOpen}
        >
          Add data
        </Button>
      </Container>
      <Footer />
      <Modal open={open} onClose={handleClose} onSubmit={handleSend} title='Add data to the table' />
    </Box>
  );
};
