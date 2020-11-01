import Contacts from '@/components/contacts-list/contacts'
import ModalApp from '@/components/modal/modal'
import { setThrowMessage } from '@/store/actions/fetchErrorActions'
import { RootState } from '@/store/types'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

const Main: FC = () => {
    const fetchErrorReducer = (state: RootState) => state.fetchErrorReducer
    const dispatch: Dispatch = useDispatch()

    const { throwMessage } = useSelector(fetchErrorReducer)

    const clearThrow = () => {
        dispatch(setThrowMessage(''))
    }

    return (
        <>
            {throwMessage && (
                <ModalApp
                    open={true}
                    title="Ваш ID для входа в будущем"
                    text={throwMessage}
                    onClose={clearThrow}
                />
            )}
            <Contacts />
        </>
    )
}

export default Main
