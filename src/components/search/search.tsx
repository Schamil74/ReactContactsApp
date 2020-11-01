import { IContacts } from '@/store/types/contactsTypes'
import withModificator from '@/withClass'
import React, { FC, useEffect, useState } from 'react'
const blockClassName = 'search'

type TPropsSearch = {
    className: string
    contacts: IContacts
    onSearch: () => void
}

const Search: FC<TPropsSearch> = props => {
    const { className, onSearch, contacts } = props
    const [hasContacts, setHasContacts] = useState<boolean>(false)

    useEffect(() => {
        setHasContacts(!!contacts.length)
    }, [contacts])

    return (
        <div className={className}>
            <div className="input">
                <input
                    type="text"
                    name="search"
                    className="input__field"
                    placeholder="Поиск по имени"
                    autoComplete="off"
                    onChange={onSearch}
                    disabled={!hasContacts ? true : false}
                />
            </div>
        </div>
    )
}

export default withModificator(Search, blockClassName)
