import { ContactPreview } from "./ContactPreview";
import { Link } from "react-router-dom"


export function ContactList({ contacts, onSelectContactId, onRemoveContact }) {


    return (
        <section className="contact-list simple-cards-grid">
            {contacts.map(contact =>
                <ContactPreview
                    key={contact._id}
                    contact={contact}
                    onRemoveContact={onRemoveContact}
                    onSelectContactId={onSelectContactId}
                />
            )}
        </section>
    )
}
