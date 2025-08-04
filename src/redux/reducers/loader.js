/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initVal = {
  isLoading: false,
  settings: null
}

const loaderSlice = createSlice({
  initialState: initVal,
  name: 'loader',
  reducers: {
    setLoading (state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setLoading } = loaderSlice.actions

export default loaderSlice.reducer
