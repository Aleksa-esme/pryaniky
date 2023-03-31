import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { login } from 'controllers/userController';
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
  OutlinedInput
} from '@mui/material';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loggedIn } = useAppSelector(state => state.appData);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    const user = {
      login: data.get('login'),
      password: data.get('password'),
    };
    
    console.log(user);
    dispatch(login(user));
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
        <Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <InputLabel htmlFor='login'>Username</InputLabel>
          <OutlinedInput
            id='login'
            type='text'
            required
            fullWidth
            name='login'
          />
          <InputLabel sx={{ mt: 1 }} htmlFor='password'>Password</InputLabel>
          <OutlinedInput
            id='password'
            type={showPassword ? 'text' : 'password'}
            required
            fullWidth
            name='password'
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
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
            size='large'
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
