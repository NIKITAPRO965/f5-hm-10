
import { useContext } from 'react';
import { ContactContext } from '../ContactContext';

function ContactListItem({ contact }) {
  const { deleteContact } = useContext(ContactContext);

  return (
    <li>
      {contact.name}: {contact.number}{' '}
      <button
        type="button"
        onClick={() => deleteContact(contact.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default ContactListItem;
