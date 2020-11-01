import Operation from '@/components/operation/operation'
import Search from '@/components/search/search'
import {
    thunkAddContact,
    thunkDeleteContact,
    thunkGetData,
} from '@/store/actions/contactsActions'
import { AppThunkDispatch, RootState } from '@/store/types'
import { IContacts } from '@/store/types/contactsTypes'
import withModificator from '@/withClass'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../loader/loader'
import ContactItem from './contact-item'

const blockClassName = 'contacts'

type TPropsContacts = {
    className: string
}

type TValues = {
    name: string
    email: string
    tel: string
}

const Contacts: FC<TPropsContacts> = props => {
    const { className } = props
    const contactsReducer = (state: RootState) => state.contactsReducer
    const fetchErrorReducer = (state: RootState) => state.fetchErrorReducer
    const authReducer = (state: RootState) => state.authReducer
    const thunkDispatch: AppThunkDispatch = useDispatch()

    const { uid } = useSelector(authReducer)
    const { contacts } = useSelector(contactsReducer)
    const { isFetchingData } = useSelector(fetchErrorReducer)
    const [filtered, setFiltered] = useState<IContacts>(contacts)
    const [touchedSearch, setTouchedSearch] = useState<boolean>(false)
    // const [hasContacts, setHasContacts] = useState<boolean>(false)
    const [data, setData] = useState<TValues>({
        name: '',
        email: '',
        tel: '',
    })

    useEffect(() => {
        if (uid) {
            thunkDispatch(thunkGetData(uid))
        }
    }, [])

    useEffect(() => {
        setFiltered(contacts)
    }, [contacts])

    const onRemove = (id: string) => {
        thunkDispatch(thunkDeleteContact(id))
    }

    const onSubmit = (data: any) => {
        setData(prevData => ({
            ...prevData,
            ...data,
        }))

        const newContact = {
            userId: uid,
            id: 'contact' + new Date().getTime().toString(),
            phone: data.tel,
            ...data,
        }

        thunkDispatch(thunkAddContact(newContact))
    }

    const onSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value.trim()

        value !== '' ? setTouchedSearch(true) : setTouchedSearch(false)

        setFiltered(
            contacts.filter(contact => {
                return (
                    contact.name.toUpperCase().indexOf(value.toUpperCase()) > -1
                )
            })
        )
    }

    return (
        <div className={className}>
            <Operation
                modificator={blockClassName}
                title="Добавить контакт"
                formData={data}
                onSubmit={onSubmit}
            />

            <h2 className={className + '__title'}>Контакты</h2>
            {isFetchingData && <Loader modificator="fixed" />}

            <Search
                modificator="contacts"
                contacts={contacts}
                onSearch={onSearch}
            />

            <ul className={className + '__list'}>
                {filtered.length > 0 ? (
                    filtered.map(c => (
                        <ContactItem
                            contact={c}
                            key={c.id}
                            onRemove={onRemove}
                        />
                    ))
                ) : (
                    <li>
                        {touchedSearch ? (
                            <p>Ничего не найдено</p>
                        ) : (
                            <p>Записей пока нет</p>
                        )}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withModificator(Contacts, blockClassName)
