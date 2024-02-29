import { createContext, useReducer } from 'react'

function notificationReducer(state, action) {
  switch (action.type) {
    case 'SET_SUCCESS':
      return {
        message: action.payload,
        success: true,
      }
    case 'SET_FAIL':
      return {
        message: action.payload,
        success: false,
      }
    case 'RESET':
      return ''
  }
}

const NotificationContext = createContext()

export function NotificationContextProvider(props) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
