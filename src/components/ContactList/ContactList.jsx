import s from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <section>
      <ul>
        {contacts.map(contact => {
          return (
            <li className={s.text} key={contact.id}>
              {contact.name} :{contact.number}
              <button type="button" onClick={() => onDeleteContact(contact.id)}>
                Удалить
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
