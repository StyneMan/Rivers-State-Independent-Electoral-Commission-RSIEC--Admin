/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initVal = {
  teams: null,
  admins: null,
};

const userSlice = createSlice({
  initialState: initVal,
  name: 'user',
  reducers: {
    setTeams(state, action) {
      state.teams = action.payload;
    },
    setAdmins(state, action) {
      state.admins = action.payload;
    },
  },
});

export const { setTeams, setAdmins } = userSlice.actions;

export default userSlice.reducer;
