import Loader from '@/components/loader/loader'
import Operation from '@/components/operation/operation'
import styles from '@/pages/edit/edit.module.scss'
import {
    thunkGetData,
    thunkUpdateContact,
} from '@/store/actions/contactsActions'
import { AppThunkDispatch, RootState } from '@/store/types'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

type TValues = {
    name: string
    email: string
    tel: string
}

type TIdParam = {
    id: string
}

const Edit: FC = () => {
    const { id } = useParams<TIdParam>()
    const contactsReducer = (state: RootState) => state.contactsReducer
    const authReducer = (state: RootState) => state.authReducer
    const fetchErrorReducer = (state: RootState) => state.fetchErrorReducer
    const thunkDispatch: AppThunkDispatch = useDispatch()
    const { uid } = useSelector(authReducer)
    const { isFetchingData } = useSelector(fetchErrorReducer)
    const { contacts } = useSelector(contactsReducer)
    const item = contacts.filter(contact => contact.id === id)
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
        if (item.length) {
            setData({
                name: item[0].name,
                email: item[0].email,
                tel: item[0].phone,
            })
        }
    }, [contacts])

    const onSubmit = (data: any) => {
        setData(prevData => ({
            ...prevData,
            ...data,
        }))

        thunkDispatch(thunkUpdateContact({ ...data }, id))
    }

    return (
        <>
            {isFetchingData ? (
                <Loader modificator="fixed" />
            ) : (
                <div className={styles.edit}>
                    <Link className={'btn ' + styles.edit__back} to={'/'}>
                        <span className="btn__text">Назад</span>
                    </Link>
                    {item.length > 0 && (
                        <Operation
                            id={id}
                            modificator="detail"
                            title="Редактировать контакт"
                            formData={data}
                            onSubmit={onSubmit}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default Edit
