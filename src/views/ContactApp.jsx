import { Component } from 'react'
import { ContactFilter } from '../cmps/ContactFilter'
import { ContactList } from '../cmps/ContactList'
import { contactService } from '../services/contactService'
import { ContactDetails } from './ContactDetails'
import { Link } from 'react-router-dom'

export class ContactApp extends Component {
  state = {
    contacts: null,
    selectedContactId: null,
    selectedContactImage: null,
    filterBy: {
      name: '',
      phone: '',
    },
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async () => {
    try {
      const contacts = await contactService.getContacts(this.state.filterBy)
      this.setState({ contacts })
    } catch (err) {
      console.log('err:', err)
    }
  }

  onSelectContactId = (contactId, image) => {
    this.setState({ selectedContactId: contactId, selectedContactImage: image })
  }

  onRemoveContact = async (ev, contactId) => {
    try {
      //   ev.stopPropagation()
      console.log(ev)
      await contactService.deleteContact(contactId)
      this.setState(({ contacts }) => ({
        contacts: contacts.filter((contact) => contact._id !== contactId),
      }))
    } catch (err) {
      console.log('err:', err)
    }
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadContacts)
  }

  render() {
    const { contacts, selectedContactId, filterBy, selectedContactImage } =
      this.state
    if (!contacts) return <div>Loading...</div>
    return (
      <section className="contact-app">
        {selectedContactId ? (
          <ContactDetails
            onBack={() => this.onSelectContactId(null)}
            contactId={selectedContactId}
            contactImage={selectedContactImage}
          />
        ) : (
          <>
            <section className="filter-container flex align-center">
              <ContactFilter
                onChangeFilter={this.onChangeFilter}
                filterBy={filterBy}
              />
              <Link to="/contacts/edit">
                <button> Add new contact</button>
              </Link>
            </section>
            <ContactList
              onRemoveContact={this.onRemoveContact}
              onSelectContactId={this.onSelectContactId}
              contacts={contacts}
            />
          </>
        )}
      </section>
    )
  }
}
