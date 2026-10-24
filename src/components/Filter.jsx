
import { useContext } from 'react';
import { ContactContext } from '../ContactContext';

function Filter() {
  const { filter, setFilter } = useContext(ContactContext);

  return (
    <label>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
    </label>
  );
}

export default Filter;
