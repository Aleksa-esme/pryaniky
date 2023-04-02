import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Button, 
  TextField,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Box,
  FormHelperText
} from '@mui/material';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TableResData } from 'api';
import { validateTextField, validateNumberField, validateSigField, validateField } from 'utils';

type Indexed = {
  [key: string] : string;
}

type Props = {
  open: boolean;
  title: string;
  data?: TableResData | null;
  focusedFiled?: string;
  onClose: () => void;
  onSubmit: SubmitHandler<FieldValues>;
};

const fields = [
  {
    label: 'Company Signature Name',
    name: 'companySignatureName',
    validation: validateSigField
  },
  {
    label: 'Document Name',
    name: 'documentName',
    validation: validateField
  },
  {
    label: 'Document Status',
    name: 'documentStatus',
    validation: validateTextField
  },
  {
    label: 'Document Type',
    name: 'documentType',
    validation: validateTextField
  },
  {
    label: 'Employee Number',
    name: 'employeeNumber',
    validation: validateNumberField
  },
  {
    label: 'Employee Signature Name',
    name: 'employeeSignatureName',
    validation: validateSigField
  },
]

const modalRoot = document.querySelector('#modals') as Element;

export const Modal: FC<Props> = ({ open, title, data, focusedFiled, onClose, onSubmit }) => {
   const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if(open) reset();
  }, [open, reset]);
  
  const handleSend = (fields: FieldValues) => {
    onSubmit(fields);
    reset();
  }

  const handleClose = () => {
    onClose();
    reset();
  }

  return (
    <>
    {createPortal(
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit(handleSend)}>
          <DialogContent sx={{ paddingTop: 'unset' }}>
            {fields.map(field => (
              <Box key={field.name} sx={{ minWidth: '400px', marginBottom: '18px' }}>
                <TextField
                  label={field.label}
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={data && (data as Indexed)[field.name]}
                  focused={focusedFiled === field.name && true} 
                  {...register(field.name, {
                    required: 'Required field',
                    validate: field.validation,
                  })}
                  error={!!errors[field.name]}
                />
                {!!errors[field.name] && (
                  <FormHelperText error sx={{ position: 'absolute' }}>
                    {errors[field.name]?.message as string}
                  </FormHelperText>
                )}
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Send</Button>
          </DialogActions>
        </Box>
      </Dialog>,
      modalRoot
    )}
    </>
  );
}
