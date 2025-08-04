/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initVal = {
  isAuth: false,
  profile: null
};
const authSlice = createSlice({
  initialState: initVal,
  name: 'auth',
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    logout(state, action) {
      localStorage.removeItem('accessToken');
      state.profile = null;
      state.profile = action.payload;
    }
  }
});

export const { setAuth, setProfile, logout } = authSlice.actions;

export default authSlice.reducer;
