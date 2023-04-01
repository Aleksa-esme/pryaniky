import { FC, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import {
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Box
} from '@mui/material';
import { TableResData } from 'controllers/tableController';

type Indexed = {
  [key: string] : string;
}

type Props = {
  open: boolean;
  title: string;
  data?: TableResData;
  focusedFiled?: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const fields = [
  {
    label: 'Company Signature Name',
    name: 'companySignatureName'
  },
  {
    label: 'Document Name',
    name: 'documentName'
  },
  {
    label: 'Document Status',
    name: 'documentStatus'
  },
  {
    label: 'Document Type',
    name: 'documentType'
  },
  {
    label: 'Employee Number',
    name: 'employeeNumber'
  },
  {
    label: 'Employee Signature Name',
    name: 'employeeSignatureName'
  },
]

const modalRoot = document.querySelector('#modals') as Element;

export const Modal: FC<Props> = ({ open, title, data, focusedFiled, onClose, onSubmit }) => {
  return (
    <>
    {createPortal(
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <Box component='form' sx={{ mt: 1 }} onSubmit={onSubmit}>
          <DialogContent sx={{ paddingTop: 'unset' }}>
            {fields.map(field => (
              <TextField
                key={field.name}
                label={field.label}
                type="text"
                fullWidth
                required
                variant="standard"
                name={field.name}
                defaultValue={data && (data as Indexed)[field.name]}
                focused={focusedFiled === field.name && true} 
                sx={{ marginBottom: '10px' }}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type='submit'>Send</Button>
          </DialogActions>
        </Box>
      </Dialog>,
      modalRoot
    )}
    </>
  );
}
