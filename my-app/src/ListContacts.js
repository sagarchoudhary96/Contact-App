import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }


  clearQuery = ()=> {
    this.setState({
      query: ''
    })
  }

  render() {
    const {contacts, onDeleteContact} = this.props
    const { query }  = this.state

    let shownContact
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      shownContact = contacts.filter((contact) => match.test(contact.name))
    }
    else {
      shownContact = contacts
    }

    shownContact.sort(sortBy('name'))
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}/>

        </div>

        {shownContact.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {shownContact.length} of {contacts.length} total.</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className="contact-list">
          {shownContact.map((contact) => (
            <li key= {contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button className="contact-remove" onClick={() => onDeleteContact(contact)} >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }

}

export default ListContacts;
