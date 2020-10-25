import Contacts from '@/components/contacts-list/contacts'
import Loader from '@/components/loader/loader'
import ModalApp from '@/components/modal/modal'
import { setThrowMessage } from '@/store/actions/fetchErrorActions'
import { RootState } from '@/store/types'
import { IContacts } from '@/store/types/contactsTypes'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

type PropsMain = {
    contacts: IContacts
}

const Main: FC<PropsMain> = props => {
    const { contacts } = props
    const fetchErrorReducer = (state: RootState) => state.fetchErrorReducer
    const { isFetchingData } = useSelector(fetchErrorReducer)
    const dispatch: Dispatch = useDispatch()
    const { throwMessage } = useSelector(fetchErrorReducer)

    const clearThrow = () => {
        dispatch(setThrowMessage(''))
    }

    return (
        <>
            {isFetchingData ? (
                <Loader />
            ) : (
                <>
                    {throwMessage && (
                        <ModalApp
                            open={true}
                            title="Ваш ID для входа в будущем"
                            text={throwMessage}
                            onClose={clearThrow}
                        />
                    )}
                    <Contacts contacts={contacts} />
                </>
            )}
        </>
    )
}

export default Main
