import { setUser, setAlertMessage } from 'store/reducers/appSlice';
import { AppDispatch } from 'store/store';
import { hasApiError } from 'utils/hasApiError';

const HOST = 'https://test.v5.pryaniky.com';

type AuthRequest = {
  login: string;
  password: string;
}

export const login = (data: AuthRequest) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)
  })
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
  // dispatch(setAlertMessage({
  //   message: 'Test',
  //   isVisible: true,
  // }));
};
