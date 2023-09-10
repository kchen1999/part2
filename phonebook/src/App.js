import { useState, useEffect } from 'react'
import _ , { add } from "lodash"
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import peopleService from './services/people'
import Notification from './Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    peopleService
    .getAll()
    .then(initialPeople => setPersons(initialPeople))
  }, [])

  const handleNameChange = (event) => { 
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const setAddNotification = () => {
    setNotificationMessage(`Added ${newName}`)
    setErrorState(false)
    setNewName("");
    setNewNumber("")
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  const addDetails = (event) => {
    event.preventDefault();
    const isSameName = persons.filter(person => person.name === newName)
    if(isSameName.length > 0 && isSameName[0].number !== newNumber) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        peopleService
          .updateEntry(isSameName[0].id, {...isSameName[0], number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== isSameName[0].id ? person : returnedPerson))
            setAddNotification(); 
          })
          .catch(() => {
            setErrorState(true)
            setNotificationMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => setNotificationMessage(null), 5000)
          })
      }
    }
    else if(isSameName.length > 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      peopleService
      .create({name: newName, number:newNumber}) 
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setAddNotification(); 
      })
      .catch(() => {
        setErrorState(true)
        setNotificationMessage(`Information of ${newName} has already been removed from server`)
        setTimeout(() => setNotificationMessage(null), 5000)
      })
   }   
  }

  const deleteDetails = (id, name) => () => {
    if(window.confirm(`Delete ${name} ?`)) {
      peopleService
        .deleteEntry(id)
        .then(() => {
          setNotificationMessage(`Deleted ${name}`)
          setErrorState(false)
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => setNotificationMessage(null), 5000)
        })
    }  
  }
      
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} errorState={errorState}/>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange}/>
      <h2>add a new </h2> <PersonForm addDetails={addDetails} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} deleteDetails={deleteDetails}/>
      
    </div>
  )
}

export default App