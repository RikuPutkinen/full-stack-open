export default function MessageBox({ message, success }) {
  if (!message) return null

  return (
    <div className={success ? 'success' : 'error'}>
      <p>{message}</p>
    </div>
  )
}