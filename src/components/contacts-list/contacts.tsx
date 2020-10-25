import { IContacts } from '@/store/types/contactsTypes'
import withModificator from '@/withClass'
import React, { FC } from 'react'
import ContactItem from './contact-item'
const blockClassName = 'contacts'

type TPropsContacts = {
    className: string
    contacts: IContacts
}

const Contacts: FC<TPropsContacts> = props => {
    const { className, contacts } = props
    const onChange = () => {}
    return (
        <div className={className}>
            <h2 className={className + '__title'}>Справочник</h2>
            <div className={className + '__list'}>
                {contacts.map(c => (
                    <ContactItem contact={c} key={c.id} onChange={onChange} />
                ))}
            </div>
        </div>
    )
}

export default withModificator(Contacts, blockClassName)
