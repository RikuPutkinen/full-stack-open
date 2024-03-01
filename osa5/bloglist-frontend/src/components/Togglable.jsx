import Proptypes from 'prop-types'
import { Button } from 'react-bootstrap'

export default function Togglable({
  visible,
  buttonLabel,
  handleShow,
  handleHide,
  children,
}) {
  const hideWhenVisible = {
    display: visible ? 'none' : '',
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={handleShow}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={handleHide}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  visible: Proptypes.bool.isRequired,
  buttonLabel: Proptypes.string.isRequired,
  handleShow: Proptypes.func.isRequired,
  handleHide: Proptypes.func.isRequired,
  children: Proptypes.element.isRequired,
}
