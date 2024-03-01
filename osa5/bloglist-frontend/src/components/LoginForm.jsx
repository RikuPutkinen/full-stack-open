import Proptypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">username</Form.Label>
        <Form.Control
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">password</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button id="login-button" type="submit">
        login
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  username: Proptypes.string.isRequired,
  setUsername: Proptypes.func.isRequired,
  password: Proptypes.string.isRequired,
  setPassword: Proptypes.func.isRequired,
  handleSubmit: Proptypes.func.isRequired,
}
