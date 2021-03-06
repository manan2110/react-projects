import React,{useRef} from 'react';
import {Link} from "react-router-dom";
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const inputEle = useRef("");
    console.log(props);
    
    const renderContactList = props.contacts.map((contact)=>{
        return(
            <ContactCard contact = {contact}  key = {contact.id}></ContactCard>
        );
    });
    
    const getSearchTerm = () =>{
        props.searchKeyword(inputEle.current.value);
    };

    return (
        <div className="main">
                <h2 style={{color:"black"}}>Contact List
                <Link to="/add">
                    <button className="ui button blue right">Add Contact</button>
                </Link>
            
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref = {inputEle} type="text" placeholder="Search Contact" className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon"></i>
                </div>

            </div>
            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : "No Contacts Found"}
            </div>
        </div>
    );
};

export default ContactList;
