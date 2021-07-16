import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { uuid } from "uuidv4";
import api from '../api/contacts';
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  //RetrieveConatacts
  const retrieveContacts = async()=>{
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id:uuid(),
      ...contact
    };
    const response = await api.post("/contacts",request)
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () =>{
      const allContacts = await retrieveContacts();
      if(allContacts)
      setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
      <Header />
      <Switch>
        <Route path="/add" exact  render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler}/>)} />
        <Route path="/" exact render={(props)=>(<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)} />  
        <Route path="/contact/:id" component={ContactDetail} />
        <Route path="/delete/:id" render={(props)=>(<DeleteContact {...props} getContactId={removeContactHandler} />)} />
      </Switch>
      {/* <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />  */}
      </Router>
      
    </div>
  );
}

export default App;
