import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/person-form'
import Persons from './components/persons'
import { createNumber, deleteNumber, getNumbers } from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')

  useEffect(() => {
    getNumbers('http://localhost:3001/persons', data => setPersons(data))
  }, [])

  const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(filterQuery.toLowerCase()))

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

    createNumber('http://localhost:3001/persons', newPerson, data => setPersons([...persons, data]))
    setNewName('')
    setNewNumber('')
  }

  function handleDelete(person) {
    if (window.confirm(`Delete ${person.name}?`)) {
      deleteNumber('http://localhost:3001/persons', person.id, setPersons(persons.filter(p => p.id !== person.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={filterQuery} onchange={e => setFilterQuery(e.target.value)} />
      <h2>Add new</h2>
      <PersonForm
        handleSubmit={e => handleSubmit(e)}
        name={newName}
        nameChange={e => setNewName(e.target.value)}
        number={newNumber}
        numberChange={e => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons people={filteredPeople} handleClick={handleDelete} />
    </div>
  )
}

export default App