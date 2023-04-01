import { FC } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  onClick: () => void;
};

export const DeleteButton: FC<Props> = ({ onClick }: any) => {
  return (
    <IconButton
      color='default'
      onClick={onClick}
    >
      <DeleteIcon />
    </IconButton>
  );
};
