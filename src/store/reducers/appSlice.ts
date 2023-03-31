import { createSlice } from '@reduxjs/toolkit';

type State = {
  tableData: [];
  loggedIn: boolean;
};

const initialState: State = {
  tableData: [],
  loggedIn: false,
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
  },
});

export const { setData, setUser } =
  appSlice.actions;

export default appSlice.reducer;
