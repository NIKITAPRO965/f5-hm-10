
import { useContext } from 'react';
import { ContactContext } from '../ContactContext';
import ContactListItem from './ContactListItem';

function ContactList() {
  const { visibleContacts } = useContext(ContactContext);

  return (
    <ul>
      {visibleContacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}

export default ContactList;
