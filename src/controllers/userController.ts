import { setUser, setAlertMessage } from 'store/reducers/appSlice';
import { AppDispatch } from 'store/store';
import { hasApiError } from 'utils/hasApiError';
import { authApi, AuthReq } from 'api';

export const login = (data: AuthReq) => async (dispatch: AppDispatch) => {
  const response = await authApi.login(data);
  
  console.log(data)
  console.log(response)

  if (hasApiError(response)) {
    dispatch(setAlertMessage({
      message: 'Не верный логин или пароль',
      isVisible: true,
    }));
    throw new Error(response.reason);
  }

  dispatch(setUser(true));
};
