import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import AddContact from './AddContact'
class App extends Component {
  state = {
    screen: 'list',
    contacts: []

  }

  componentDidMount() {
      ContactsAPI.getAll().then((contacts) => {
        this.setState({contacts})
      })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
        contacts: state.contacts.filter((c)=> c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  createContact = (contact) => {
    ContactsAPI.create(contact).then(contact=>{
      this.setState(state =>({
        contacts: state.contacts.concat([contact])
      }))
    })
  }
  render() {
    return (<div className="app">
      <Route exact path="/" render = {() => (
        <ListContacts contacts = {this.state.contacts} onDeleteContact = {this.removeContact}
        onNavigate = {() => {
          this.setState({screen: 'AddContact'})
        }} />
      )}/>
    <Route path="/AddContact" render = {({history}) => (
        <AddContact
          onCreateContact = {(contact) => {
            this.createContact(contact)
            history.push('/')
          }}
          />
      )}/>
    </div>
    )
  }
}

export default App;
