export default function ResultList({ results }) {
  if (results.length === 0) return <p>No results.</p>
  if (results.length === 1) return null
  if (results.length > 10) return <p>Too many results. Use a more specific term.</p>
  return (
    <ul>
      {results
        .map(c => {
          return (
            <li key={c.name.common}>{c.name.common}</li>
          )
        })
      }
    </ul>
  )
}