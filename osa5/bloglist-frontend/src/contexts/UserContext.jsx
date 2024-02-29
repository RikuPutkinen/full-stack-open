import { createContext, useReducer } from 'react'

function userReducer(state, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.payload
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export function UserContextProvider(props) {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
