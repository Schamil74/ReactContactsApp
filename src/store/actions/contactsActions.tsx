import axios from '@/axios'
import messages from '@/messages'
import { AppThunkAction } from '@/store/types'
import {
    IContacts,
    SetClearActionType,
    SetItemDataActionType,
    SET_CLEAR,
    SET_ITEM_DATA,
} from '@/store/types/contactsTypes'
import { setIsErrorData, setIsFetchingData } from './fetchErrorActions'

export const thunkGetData = (uid: string): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true))

        const response = await axios.get(`/data/${uid}`)

        dispatch(setContatcs(response.data.contacts))
        dispatch(setIsFetchingData(false))
    } catch (error) {
        dispatch(setIsFetchingData(false))
        if (messages[error.message]) {
            const msg = messages[error.message]
            dispatch(setIsErrorData({ error: true, msg }))
        } else {
            dispatch(setIsErrorData({ error: true, msg: error.message }))
        }
    }
}

export const setContatcs = (contacts: IContacts): SetItemDataActionType => {
    return { type: SET_ITEM_DATA, contacts }
}

export const setClearData = (): SetClearActionType => {
    return {
        type: SET_CLEAR,
    }
}
