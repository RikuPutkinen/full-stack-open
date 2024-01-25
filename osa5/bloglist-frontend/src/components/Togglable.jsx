export default function Togglable({ visible, buttonLabel, handleShow, handleHide, children }) {
  const hideWhenVisiblle = {
    display: visible ? 'none' : ''
  }
  const showWhenVisiblle = {
    display: visible ? '' : 'none'
  }

  return (
    <div>
      <div style={hideWhenVisiblle}>
        <button onClick={handleShow}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisiblle}>
        {children}
        <button onClick={handleHide}>cancel</button>
      </div>
    </div>
  )
}