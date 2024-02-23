import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotification(state, action) {
      return action.payload
    }
  }
})

export function setNotification(message, duration) {
  return function(dispatch) {
    dispatch(changeNotification(message))
    setTimeout(() => {
      dispatch(changeNotification(''))
    }, duration * 1000)
  }
}

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer