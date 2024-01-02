import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '3545654' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (newName === '' || newNumber === '') return
    if (persons.findIndex(person => person.name === newName) !== -1) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input type='tel' value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => {
          return (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          )
        })}
      </ul>
    </div>
  )

}

export default App