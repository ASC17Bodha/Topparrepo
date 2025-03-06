import './App.css';
import Header from './header';
import AddContact from './addcontact';
import ContactList from './contactlist';
import ContactCard from './contactcard';
import React, {useEffect, useState} from 'react';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const[contacts, setContacts] = useState([]);
  const addContactHandler = (contact) =>{
    console.log(contact);
    setContacts([...contacts, contact]);
  }
  useEffect(()=>{
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(retriveContacts) setContacts(retriveContacts);
  }, []);
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  }, [contacts]);
  return (
    <div className="App ui container">

    <Header />
    <AddContact addContactHandler={addContactHandler} />
     <ContactList contacts={contacts} />
     {/* <ContactCard /> */}
    </div>
  );
}

export default App;
