import { Component } from 'react';
import shortid from 'shortid';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  #localstorageKey = 'contacts';

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        this.#localstorageKey,
        JSON.stringify(this.state.contacts),
      );
    }
  }

  componentDidMount() {
    const storageContacts = localStorage.getItem(this.#localstorageKey);
    const contacts = JSON.parse(storageContacts);
    if (contacts) {
      this.setState({ contacts });
    }
  }

  handleFormSubmit = data => {
    const isContact = this.state.contacts.find(
      ({ name }) => name === data.name,
    );

    if (isContact) {
      return window.alert(`Контакт с именем ${data.name} уже существет`);
    } else {
      const contact = {
        id: shortid.generate(),
        name: data.name,
        number: data.number,
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = ({ target: { value: filter } }) => {
    this.setState({ filter });
  };

  getVisibleContact = () => {
    const normalValueFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalValueFilter),
    );
  };

  render() {
    const visibleContacts = this.getVisibleContact();

    return (
      <div className={s.app}>
        <header className={s.appHeader}>
          <h2 className={s.title}>Телефонная книга</h2>
          <ContactForm onSubmit={this.handleFormSubmit} />
          <h3 className={s.title}>Контакты</h3>
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </header>
      </div>
    );
  }
}

export default App;
