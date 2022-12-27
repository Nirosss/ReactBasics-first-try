import { Link } from 'react-router-dom'

export function ContactPreview({ contact, onRemoveContact }) {
  const previewStyle = `https://avatars.dicebear.com/api/big-smile/${contact._id}.svg?b=%231f0505&r=50&size=100`

  return (
    <section className="contact-preview">
      <Link to={`/contacts/${contact._id}`} className="contact-link">
        <section className="info flex align-center">
          <div  className="contact-image"><img src={previewStyle} alt="" /></div>
          <h2>{contact.name}</h2>
        </section>
      </Link>
      <section className="actions flex">
        <button
          onClick={(ev) => {
            ev.stopPropagation()
            onRemoveContact(ev, contact._id)
          }}>
          Delete
        </button>
        <Link to={`/contacts/edit/${contact._id}`}>
          <button> Edit</button>
        </Link>
      </section>
    </section>
  )
}

// onSelectContactId
// onClick={() => onSelectContactId(contact._id , previewStyle)}
