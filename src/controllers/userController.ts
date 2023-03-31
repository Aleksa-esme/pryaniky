import { setUser } from 'store/reducers/appSlice';
import { AppDispatch } from 'store/store';
import { hasApiError } from 'utils/hasApiError';

const HOST = 'https://test.v5.pryaniky.com';

export const login = (data:any) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)
  })

  if (hasApiError(response)) {
    throw new Error(response.reason);
  }

  let result = await response.json();
  console.log(result);

  dispatch(setUser(true));
};
