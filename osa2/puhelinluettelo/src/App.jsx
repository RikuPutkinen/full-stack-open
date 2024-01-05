import { useEffect, useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/person-form'
import Persons from './components/persons'
import { createNumber, deleteNumber, getNumbers, updateNumber } from './services/numbers'
import { MessageBox } from './components/message-box'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(true)

  useEffect(() => {
    getNumbers('http://localhost:3001/persons', data => setPersons(data))
  }, [])

  const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(filterQuery.toLowerCase()))

  function showMessage(message, success) {
    setMessage(message)
    setSuccess(success)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

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
        data => {
          setPersons(persons.map(p => {
            console.log("person", p)
            console.log('data', data)
            if (p.id === data.id) return data
            return p
          }))
          showMessage(`Updated ${newName}`, true)
        },
        () => {
          showMessage(`${person.name} has already been deleted from server`, false)
          setPersons(persons.filter(p => p.id !== person.id))
        }
      )
    }
    else {
      createNumber(
        'http://localhost:3001/persons',
        newPerson,
        data => {
          setPersons([...persons, data])
          showMessage(`Added ${newName}`, true)
        })
    }
    setNewName('')
    setNewNumber('')

  }

  function handleDelete(person) {
    if (window.confirm(`Delete ${person.name}?`)) {
      deleteNumber(
        'http://localhost:3001/persons',
        person.id,
        () => {
          setPersons(persons.filter(p => p.id !== person.id))
          showMessage(`Deleted ${person.name}`, true)
        }      
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <MessageBox message={message} success={success} />
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