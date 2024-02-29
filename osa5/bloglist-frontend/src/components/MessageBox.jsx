import Proptypes from 'prop-types'
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

export default function MessageBox() {
  const [notification, dispatchNotification] = useContext(NotificationContext)
  if (!notification.message) return null

  setTimeout(() => {
    dispatchNotification({ type: 'RESET' })
  }, 5000)
  return (
    <div className={notification.success ? 'success' : 'error'}>
      <p>{notification.message}</p>
    </div>
  )
}
