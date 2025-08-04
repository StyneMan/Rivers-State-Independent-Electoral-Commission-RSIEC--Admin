/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initVal = {
  allApplications: null,
  pendingApplications: null,
  rejectedApplications: null,
  approvedApplications: null
}
const applicationSlice = createSlice({
  initialState: initVal,
  name: 'application',
  reducers: {
    setApplications (state, action) {
      state.allApplications = action.payload
    },
    setPendingApplications (state, action) {
      state.pendingApplications = action.payload
    },
    setRejectedApplications (state, action) {
      state.rejectedApplications = action.payload
    },
    setApprovedApplications (state, action) {
      state.approvedApplications = action.payload
    }
  }
})

export const { setApplications, setApprovedApplications, setPendingApplications, setRejectedApplications } = applicationSlice.actions

export default applicationSlice.reducer
