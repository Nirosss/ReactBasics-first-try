import { Component } from 'react'
import { contactService } from '../services/contactService.js'

export class ContactEdit extends Component {

    state = {
        contact: contactService.getEmptyContact()
    }

    async componentDidMount() {
        const contactId = this.props.match.params.id
        if (contactId) {
            const contact = await contactService.getContactById(contactId)
            this.setState({ contact })
        }
    }

    onAddContact = async (ev) => {
        ev.preventDefault()
        try {
            await contactService.saveContact({ ...this.state.contact })
            this.props.history.push('/')
        } catch (err) {
            console.log('err:', err)
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }

        this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))

    }

    render() {
        const { contact } = this.state
        if (!contact) return
        const { name, email, phone } = contact
        return (
            <section className='contact-edit'>
                <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
                <form onSubmit={this.onAddContact}>
                    <label htmlFor="name">Name</label>
                    <input onChange={this.handleChange} value={name} type="text" name="name" id="name" />
                    <label htmlFor="email">Email</label>
                    <input onChange={this.handleChange} value={email} type="email" name="email" id="email" />
                    <label htmlFor="phone">Phone</label>
                    <input onChange={this.handleChange} value={phone} type="phone" name="phone" id="phone" />
                    <button>Add</button>
                </form>
            </section>
        )
    }
}
