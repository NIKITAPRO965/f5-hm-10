import { Component } from 'react';

class ContactListItem extends Component {
  render() {
    const { contact, onDeleteContact } = this.props;

    return (
      <li>
        {contact.name}: {contact.number}

        <button
          type="button"
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    );
  }
}

export default ContactListItem;