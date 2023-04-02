import { setUser, setAlertMessage } from 'store/reducers/appSlice';
import { AppDispatch } from 'store/store';
import { hasApiError } from 'utils/hasApiError';
import { authApi, AuthReq } from 'api';

export const signIn = (data: AuthReq) => async (dispatch: AppDispatch) => {
  const response = await authApi.login(data);
  
  if (hasApiError(response)) {
    dispatch(setAlertMessage({
      message: 'Invalid username or password',
      isVisible: true,
    }));
    
    throw new Error(response.reason);
  }

  // текущее время + 3 дня в миллисекундах
  const token = {value: `${response.data.token}${data.login}`, timestamp: Date.now() + 259200000};

  localStorage.setItem('tokenJWT', JSON.stringify(token));

  dispatch(setUser(true));
};

export const signOut = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('tokenJWT');
  
  dispatch(setUser(false));
};
