import Proptypes from 'prop-types'

export default function Togglable(
  {
    visible,
    buttonLabel,
    handleShow,
    handleHide,
    children
  }) {
  const hideWhenVisible = {
    display: visible ? 'none' : ''
  }
  const showWhenVisible = {
    display: visible ? '' : 'none'
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleShow}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={handleHide}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  visible: Proptypes.bool.isRequired,
  buttonLabel: Proptypes.string.isRequired,
  handleShow: Proptypes.func.isRequired,
  handleHide: Proptypes.func.isRequired,
  children: Proptypes.element.isRequired
}