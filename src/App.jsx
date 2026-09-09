import { Component } from "react";
import { nanoid } from "nanoid";
import "./App.css";
// import Form from "./components/Form"

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

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

const STORAGE_KEY = "phonebook-contacts";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(STORAGE_KEY);

    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase(),
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

    this.setState(
      (prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
      },
    );
  };

  changeFilter = (event) => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  deleteContact = (id) => {
    this.setState(
      (prevState) => ({
        contacts: prevState.contacts.filter((contact) => contact.id !== id),
      }),
      () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
      },
    );
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
