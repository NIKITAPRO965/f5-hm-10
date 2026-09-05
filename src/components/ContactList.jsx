import { Component } from 'react';
import ContactListItem from './ContactListItem';

class ContactList extends Component {
  render() {
    const { contacts, onDeleteContact } = this.props;

    return (
      <ul>
        {contacts.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </ul>
    );
  }
}

export default ContactList;