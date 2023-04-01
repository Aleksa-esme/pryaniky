import { FC, useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalAlert } from 'components';

type Props = {
  onSubmit: () => void;
};

export const DeleteButton: FC<Props> = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <IconButton
        color='default'
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
      <ModalAlert 
        open={open} 
        onClose={() => setOpen(false)} 
        onSubmit={onSubmit} 
      />
    </>
  );
};
