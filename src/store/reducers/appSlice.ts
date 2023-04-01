import { createSlice } from '@reduxjs/toolkit';

type State = {
  tableData: [];
  loggedIn: boolean;
  loading: boolean;
};

const initialState: State = {
  tableData: [],
  loggedIn: false,
  loading: false,
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
  },
});

export const { setData, setUser, setLoading } =
  appSlice.actions;

export default appSlice.reducer;
