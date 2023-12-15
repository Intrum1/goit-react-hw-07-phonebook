import { nanoid } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../Redux/contacts/selectors';
import { addContactAction } from '../../Redux/contacts/contactSlise';
import { Container, Label, Input, Button } from './ContactForm.styled';

export const ContactForm = () => {
  const { contacts } = useSelector(getContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = ({ target }) => {
    if (target.name === 'name') {
      setName(target.value);
    } else if (target.name === 'number') {
      setNumber(target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
  };

  const addContact = ({ name, number }) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = [
      ...contacts,
      {
        id: nanoid(),
        name,
        number,
      },
    ];
    dispatch(addContactAction(newContact));
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        name="name"
        value={name}
        required
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={onInputChange}
      />

      <Label htmlFor="number">Number</Label>
      <Input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        required
        value={number}
        onChange={onInputChange}
      />

      <Button type="submit">Add contact</Button>
    </Container>
  );
};

export default ContactForm;
