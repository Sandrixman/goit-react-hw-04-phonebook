import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const LS_KEY = 'phonebook';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const isContactExists = this.state.contacts.some(
      contact => contact.name === data.name
    );

    isContactExists
      ? alert(`${data.name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, { ...data, id: nanoid() }],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onFilter = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const savedState = JSON.parse(localStorage.getItem(LS_KEY));
    if (savedState) {
      this.setState({ contacts: savedState });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  render() {
    const onFilter = this.onFilter();

    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter changeFilter={this.changeFilter} value={this.state.filter} />
        <ContactList onFilter={onFilter} onDelete={this.deleteContact} />
      </section>
    );
  }
}

export default App;
