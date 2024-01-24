export default function LoginForm({ username, setUsername, password, setPassword, handleSubmit }) {
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
      <button type="submit">login</button>
    </form>
  )
}