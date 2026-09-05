import { Component } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
// import Form from "./components/Form"

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';


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


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const { contacts } = this.state;

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>

        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>

        <Filter
          value={filter}
          onChange={this.changeFilter}
        />

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}


export default App


