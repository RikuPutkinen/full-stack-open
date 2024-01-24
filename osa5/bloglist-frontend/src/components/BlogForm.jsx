export default function BlogForm({ newBlog, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleChange}
        />
      </div>      
      <div>
        <label htmlFor="author">author:</label>
        <input
          id="author"
          name="author"
          value={newBlog.author}
          onChange={handleChange}
        />
      </div>      
      <div>
        <label htmlFor="url">url:</label>
        <input
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleChange}
        />
      </div>
      <button>create</button>
    </form>
  )
}