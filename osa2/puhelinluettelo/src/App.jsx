import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import PersonForm from './components/person-form'
import Persons from './components/persons'
import { createNumber, deleteNumber, getNumbers, updateNumber } from './services/numbers'

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
    
    const person = persons.find(person => person.name === newName) 
    
    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    if (person) {
      window.confirm(`${person.name} is already added to the phonebook. Do you want replace it?`)
      updateNumber(
        'http://localhost:3001/persons',
        person.id,
        newPerson,
        data => setPersons(persons.map(p => {
          console.log("person", p)
          console.log('data', data)
          if (p.id === data.id) return data
          return p
        }))
      )
    }
    else {
      createNumber('http://localhost:3001/persons', newPerson, data => setPersons([...persons, data]))
    }
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