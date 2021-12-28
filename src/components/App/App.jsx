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
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  handleFormSubmit = data => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };
    const onAddContact = () => {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    };
    if (this.state.contacts.find(item => item.name === data.name)) {
      return window.alert(`Котакт с именем ${data.name} уже существет`);
    } else {
      onAddContact();
    }
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.target.value });
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
