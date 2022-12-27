import { Component } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../services/contactService'
import { UserService } from '../services/UserService'
export class ContactDetails extends Component {
  state = {
    contact: null,
    userMsg: null,
  }

  componentDidMount() {
    this.loadContact()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }

  loadContact = async () => {
    const contact = await contactService.getContactById(
      this.props.match.params.id
    )
    this.setState({ contact })
  }

  onTransfer = async (ev) => {
    try {
      ev.preventDefault()
      const amount = +ev.target[0].value
      const toUser = this.state.contact
      await UserService.addMove(
        { amount, toUser },
        this.setState({ userMsg: 'Transfer Succeed' }),
        setTimeout(() => this.setState({ userMsg: null }), 2000)
      )
    } catch (err) {
      console.log(err)
      this.setState({ userMsg: err })
    }
  }
  render() {
    const { contact } = this.state
    const previewStyle = {
      backgroundImage: `url(https://avatars.dicebear.com/api/big-smile/${this.props.match.params.id}.svg)`,
    }
    if (!contact) return <div>Loading...</div>
    return (
      <section className="contact-details-container">
        <section className="actions flex">
          <Link to="/contacts">
            <button> Back</button>
          </Link>
          <Link to={`/contacts/edit/${contact._id}`}>
            <button>Edit</button>
          </Link>
        </section>
        <section className="contact-details">
          <section style={previewStyle} className="user-image"></section>
          <section className="info">
            <section>
              <h3>Name: {contact.name}</h3>
            </section>
            <section>
              <h3>E-mail: {contact.email}</h3>
            </section>
            <section>
              <h3>Phone: {contact.phone}</h3>
            </section>
          </section>
          <section>
            <form onSubmit={this.onTransfer} className="transfer-input flex">
              <label htmlFor="name">Transfer Founds to this contact</label>
              <input
                // onChange={this.handleChange}
                type="number"
                name="amount"
                id="amount"
              />
              <button>Transfer</button>
              {(this.state.userMsg ||
                this.state.userMsg !== 'Transfer Succeed') && (
                <div>{this.state.userMsg}</div>
              )}
            </form>
          </section>
        </section>
      </section>
    )
  }
}
