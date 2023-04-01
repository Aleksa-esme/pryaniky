import { FC } from 'react';
import { createPortal } from 'react-dom';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const modalRoot = document.querySelector('#modals') as Element;

export const ModalAlert: FC<Props> = ({ open, onClose, onSubmit }) => {
  return (
    <>
    {createPortal(
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Do you want to delete row?</DialogTitle>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit}>Delete</Button>
          </DialogActions>
      </Dialog>,
      modalRoot
    )}
    </>
  );
}
