import { createSlice } from '@reduxjs/toolkit';
import { checkTokenValid } from 'utils/checkToken';

const token = localStorage.getItem('tokenJWT');

const isValid = (token: string | null) => {
  return token ? checkTokenValid(token) : false
}

type Alert = {
  message: string | null;
  isVisible: boolean;
}

type State = {
  tableData: [];
  loggedIn: boolean;
  loading: boolean;
  alertMessage: Alert | null;
};

const initialState: State = {
  tableData: [],
  loggedIn: isValid(token) ? true : false,
  loading: false,
  alertMessage: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.tableData = payload;
    },
    setUser: (state, { payload }) => {
      state.loggedIn = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setAlertMessage: (state, { payload }) => {
      state.alertMessage = payload;
    },
  },
});

export const { setData, setUser, setLoading, setAlertMessage } =
  appSlice.actions;

export default appSlice.reducer;
