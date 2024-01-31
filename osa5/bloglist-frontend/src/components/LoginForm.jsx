import Proptypes from 'prop-types'

export default function LoginForm(
  {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit
  }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: Proptypes.string.isRequired,
  setUsername: Proptypes.func.isRequired,
  password: Proptypes.string.isRequired,
  setPassword: Proptypes.func.isRequired,
  handleSubmit: Proptypes.func.isRequired
}