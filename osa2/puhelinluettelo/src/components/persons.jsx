export default function Persons({ people }) {
  return (
    <ul>
      {people.map(person => {
        return (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        )
      })}
  </ul>
  )
}