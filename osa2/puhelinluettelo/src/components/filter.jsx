export default function Filter({ query, onchange }) {
  return (
    <div>
      <p>Filter names</p>
      <input value={query} onChange={onchange}/>
    </div>
  )
}