import React from "react";
import ContactCard from "./contactcard";


const ContactList = (props) =>{
    console.log(props);
    const renderContactList=props.contacts.map((contact)=>{
        return(
            <ContactCard contact={contact}></ContactCard>
        )
    })
    return(
        <div className="ui celled List">
            ContactList
            {renderContactList}
        </div>
    )
}

export default ContactList;