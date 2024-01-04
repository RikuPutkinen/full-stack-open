export default function Persons({ people, handleClick }) {
  return (
    <ul>
      {people.map(person => {
        return (
          <li key={person.name}>
            <p>{person.name} {person.number}</p>
            <button onClick={() => handleClick(person)}>Delete</button>
          </li>
        )
      })}
  </ul>
  )
}