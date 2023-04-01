import { createSlice } from '@reduxjs/toolkit';

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
  loggedIn: false,
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
