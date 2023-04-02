import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks';
import { signIn } from 'controllers/userController';
import { RouterPaths } from 'App';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { 
  IconButton, 
  Avatar, 
  InputAdornment, 
  InputLabel, 
  Container, 
  Typography, 
  Box, 
  CssBaseline, 
  Button, 
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import { Toast } from 'components';
import { validatePassword, validateLogin } from 'utils';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loggedIn, alertMessage } = useAppSelector(state => state.appData);

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ login, password }) => {
    dispatch(signIn({ login, password }));
  }

  useEffect(() => {
    if(loggedIn) navigate(RouterPaths.MAIN);
  }, [loggedIn, navigate]);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor='login'>Username</InputLabel>
          <OutlinedInput
            id='login'
            type='text'
            fullWidth
            {...register('login', {
              required: 'Required field',
              validate: validateLogin,
            })}
            error={!!errors.login}
          />
          {!!errors.login && (
            <FormHelperText error sx={{ position: 'absolute' }}>
              {errors.login.message as string}
            </FormHelperText>
          )}
          
          <InputLabel sx={{ mt: 2 }} htmlFor='password'>Password</InputLabel>
          <OutlinedInput
            id='password'
            type={showPassword ? 'text' : 'password'}
            fullWidth
            {...register('password', {
              required: 'Required field',
              validate: validatePassword,
            })}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!!errors.password && (
            <FormHelperText error sx={{ position: 'absolute' }}>
              {errors.password.message as string}
            </FormHelperText>
          )}
          
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 4 }}
            size='large'
          >
            Sign In
          </Button>
        </Box>
      </Box>
      {alertMessage && (
        <Toast message={alertMessage.message} isVisible={alertMessage.isVisible} />
      )}
    </Container>
  );
};
