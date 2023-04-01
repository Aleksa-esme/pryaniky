import { FC, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch } from 'hooks';
import { setAlertMessage } from 'store/reducers/appSlice';

type Props = {
  message: string | null;
  isVisible: boolean;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Toast: FC<Props> = ({ message, isVisible, severity = 'error' }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setAlertMessage(null));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isVisible} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
