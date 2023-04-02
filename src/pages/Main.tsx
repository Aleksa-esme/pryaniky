import { FC, useState } from 'react';
import { CssBaseline, Box, Button, Container } from '@mui/material';
import { Table, Header, Footer, Modal } from 'components';
import { useAppDispatch } from 'hooks';
import { sendData } from 'controllers/tableController';
import { FieldValues, SubmitHandler} from 'react-hook-form';

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleSend: SubmitHandler<FieldValues> = ({
    companySignatureName, documentName, documentStatus, documentType, employeeNumber, employeeSignatureName
  }) => {
    dispatch(sendData({
      companySignatureName, 
      documentName, 
      documentStatus, 
      documentType, 
      employeeNumber, 
      employeeSignatureName, 
      companySigDate: new Date(), 
      employeeSigDate: new Date(),
    }));
    setOpen(false);
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
          onClick={() => setOpen(true)}
        >
          Add data
        </Button>
      </Container>
      <Footer />
      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        onSubmit={handleSend} 
        title='Add data to the table' 
      />
    </Box>
  );
};
