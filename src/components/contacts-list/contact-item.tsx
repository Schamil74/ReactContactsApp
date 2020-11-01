import { normalizePhoneNumber } from '@/components/operation/operation'
import { TItem } from '@/store/types/contactsTypes'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
type TPropsContact = {
    contact: TItem
    onRemove: (id: string) => void
}

const ContactItem: FC<TPropsContact> = ({ onRemove, contact }) => {
    const { id, name, phone, email } = contact

    return (
        <li className={'contacts__item'} id={'id' + id}>
            <div className="contacts__col contacts__col_name">{name}</div>
            <div className="contacts__col contacts__col_phone">
                <a href={'tel:' + phone}>{normalizePhoneNumber(phone)}</a>
            </div>
            <div className="contacts__col contacts__col_email">
                <a href={'mailto:' + email}>{email}</a>
            </div>
            <div className="contacts__col contacts__col_btn">
                <Link className="btn btn_warning" to={'/record/' + id}>
                    <span className="btn__text">Редактировать</span>
                </Link>

                <button className="btn btn_alert" onClick={() => onRemove(id)}>
                    <span className="btn__text">Удалить</span>
                </button>
            </div>
        </li>
    )
}

export default ContactItem
