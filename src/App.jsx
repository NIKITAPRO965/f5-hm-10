
// class App extends Component{

//   state = {
//         appName: "",
//         appSecondName: "",
//         appCourses: "",
//         appActiveCheck: false,
//     }

//     handleAppSubmitForm = (data) => {
//       console.log("отриманні дані в Апп", data);

//       this.setState({
//         appName: data.name,
//         appSecondName: data.secondName,
//         appCourses: data.courses,
//         appActiveCheck: data.activeCheck,
//       })
//     }

//   render(){

//     const {appName, appSecondName, appCourses} = this.state

//     return (
//       <>
//         <h1>Hellow {appName ? `${appName} ${appSecondName}` : "незнайомець"}</h1>
//         {appCourses && <p>ви обрали курс - {appCourses}</p>}
//         <Form onFormSubmit={this.handleAppSubmitForm}/>
//       </>
//     )
//   }
// }



import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

import { ContactContext } from './ContactContext';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList'
import Filter from './components/Filter'

const STORAGE_KEY = 'phonebook-contacts';

function App() {
  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem(STORAGE_KEY);
      return savedContacts ? JSON.parse(savedContacts) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const normalizedName = name.trim();

    const isDuplicate = contacts.some(
      contact =>
        contact.name.toLowerCase() === normalizedName.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${normalizedName} is already in contacts.`);
      return false;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      {
        id: nanoid(),
        name: normalizedName,
        number: number.trim(),
      },
    ]);

    return true;
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const contextValue = {
    addContact,
    deleteContact,
    visibleContacts,
    filter,
    setFilter,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </ContactContext.Provider>
  );
}

export default App;
