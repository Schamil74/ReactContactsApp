import axios from '@/axios'
import messages from '@/messages'
import { AppThunkAction } from '@/store/types'
import {
    IContacts,
    SetAddContactActionType,
    SetClearActionType,
    SetDeleteContactActionType,
    SetItemDataActionType,
    SetUpdateContactActionType,
    SET_ADD_CONTACT,
    SET_CLEAR,
    SET_DELETE_CONTACT,
    SET_ITEM_DATA,
    SET_UPDATE_CONTACT,
    TItemFull,
} from '@/store/types/contactsTypes'
import { setIsErrorData, setIsFetchingData } from './fetchErrorActions'

export const thunkGetData = (uid: string): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true))

        const response = await axios.get(`/users/${uid}/contacts/`)
        dispatch(setContatcs(response.data))
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

export const thunkDeleteContact = (
    id: string
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true))

        await axios.delete(`/contacts/${id}`)

        dispatch(setDeleteContact(id))
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

export const thunkAddContact = (
    contact: TItemFull
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true))

        await axios.post(`/contacts/`, { ...contact })

        dispatch(setAddContact(contact))
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

export const thunkUpdateContact = (
    contact: TItemFull,
    id: string
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingData(true))

        const a = await axios.patch(`/contacts/${id}`, { ...contact })
        console.log(a.data)
        dispatch(setUpdateContact(contact))
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

export const setDeleteContact = (id: string): SetDeleteContactActionType => {
    return { type: SET_DELETE_CONTACT, id }
}

export const setAddContact = (contact: TItemFull): SetAddContactActionType => {
    return { type: SET_ADD_CONTACT, contact }
}

export const setUpdateContact = (
    contact: TItemFull
): SetUpdateContactActionType => {
    return { type: SET_UPDATE_CONTACT, contact }
}

export const setClearData = (): SetClearActionType => {
    return {
        type: SET_CLEAR,
    }
}
