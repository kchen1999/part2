const Persons = ({persons, nameFilter, deleteDetails}) => 
{
return persons.map(person => {
    if(person.name.toUpperCase().includes(nameFilter.toUpperCase())) {
        return <div key={person.id}>{person.name} {person.number} <button onClick={deleteDetails(person.id, person.name)}>delete</button></div>
    }
    else {
        return <div key={person.id}></div>
    }
})
}

export default Persons;