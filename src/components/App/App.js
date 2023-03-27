import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const LS_KEY = 'phonebook';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const isContactExists = contacts.some(
      contact => contact.name === data.name
    );

    isContactExists
      ? alert(`${data.name} is already in contacts`)
      : setContacts(prevState => [...prevState, { ...data, id: nanoid() }]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onFilter = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <section>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter changeFilter={changeFilter} value={filter} />
      <ContactList onFilter={onFilter()} onDelete={deleteContact} />
    </section>
  );
}
