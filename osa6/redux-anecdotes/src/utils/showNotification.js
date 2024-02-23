import { changeNotification } from "../reducers/notificationReducer"

export default function showNotification(message, dispatcher) {
  dispatcher(changeNotification(message))
  setTimeout(() => {
    dispatcher(changeNotification(''))
  }, 5000)
}