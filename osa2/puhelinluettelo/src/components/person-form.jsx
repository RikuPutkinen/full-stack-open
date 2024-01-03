export default function PersonForm({ handleSubmit, name, nameChange, number, numberChange}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={nameChange}/>
      </div>
      <div>
        number: <input type='tel' value={number} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}