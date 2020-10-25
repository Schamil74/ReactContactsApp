import { TItem } from '@/store/types/contactsTypes'
import React, { FC } from 'react'

type TPropsContact = {
    contact: TItem
    onChange: () => void
}

const ContactItem: FC<TPropsContact> = props => {
    const { id, name, phone, email } = props.contact

    return (
        <div className={'contacts__item'} id={'id' + id}>
            <div className="contacts__col contacts__col_name">{name}</div>
            <div className="contacts__col contacts__col_phone">
                <a href={'tel:' + phone}>{phone}</a>
            </div>
            <div className="contacts__col contacts__col_email">
                <a href={'mailto:' + email}>{email}</a>
            </div>
            <div className="contacts__col contacts__col_btn">
                <button className="btn btn_warning">
                    <span className="btn__text">Редактировать</span>
                </button>
                <button className="btn btn_alert">
                    <span className="btn__text">Удалить</span>
                </button>
            </div>
        </div>
    )
}

export default ContactItem
