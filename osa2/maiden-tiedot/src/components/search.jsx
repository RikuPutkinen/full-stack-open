export default function Search({ query, handleChange }) {
  return (
    <p>
      Find countries <input value={query} onChange={handleChange}/>
    </p>
  )
}