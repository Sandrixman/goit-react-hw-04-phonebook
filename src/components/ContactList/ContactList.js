const ContactList = ({ onFilter, onDelete }) => {
  if (onFilter) {
    return (
      <>
        {onFilter.map(contact => (
          <ul key={contact.id}>
            <li>
              {contact.name}: {contact.number}
            </li>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </ul>
        ))}
      </>
    );
  }
};

export default ContactList;
