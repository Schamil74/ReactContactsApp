import axios from '@/axios'
import messages from '@/messages'
import { setClearData } from '@/store/actions/contactsActions'
import { AppThunkAction } from '@/store/types'
import { SetUidActionType, SET_UID, TUidType } from '@/store/types/authTypes'
import {
    setIsErrorAuth,
    setIsFetchingAuth,
    setThrowMessage,
} from './fetchErrorActions'

export const thunkLogin = (uid: TUidType): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingAuth(true))

        const responseAuth = await axios.get(`/users/${uid}`)

        if (responseAuth.data.id === uid) {
            await axios.put(`/auth/`, {
                uid: responseAuth.data.id,
            })
            dispatch(setUid(responseAuth.data.id))
            dispatch(setIsFetchingAuth(false))
        }
    } catch (error) {
        dispatch(setIsFetchingAuth(false))
        if (messages[error.message]) {
            const msg = messages[error.message]
            dispatch(setIsErrorAuth({ error: true, msg }))
        } else {
            dispatch(setIsErrorAuth({ error: true, msg: error.message }))
        }
    }
}

export const thunkRegister = (
    uid: TUidType
): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingAuth(true))

        const responseAuth = await axios.get(`/db`)

        const user = responseAuth.data.users.find(
            (user: any) => user.id === uid
        )

        if (user) {
            throw new Error('Пользователь с таким ID уже зарегистрирован')
        }

        const id = uid + new Date().getTime().toString()

        const responseRegister = await axios.post(`/auth/`, {
            uid: id,
        })

        await axios.post(`/users`, {
            id: responseRegister.data.uid,
        })

        dispatch(setUid(responseRegister.data.uid))
        dispatch(setThrowMessage(responseRegister.data.uid))
        dispatch(setIsFetchingAuth(false))
    } catch (error) {
        dispatch(setIsFetchingAuth(false))
        if (messages[error.message]) {
            const msg = messages[error.message]
            dispatch(setIsErrorAuth({ error: true, msg }))
        } else {
            dispatch(setIsErrorAuth({ error: true, msg: error.message }))
        }
    }
}

export const thunkIsAuth = (): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingAuth(true))

        const response = await axios.get(`/auth/`)

        dispatch(setUid(response.data.uid))
        dispatch(setIsFetchingAuth(false))
    } catch (error) {
        dispatch(setIsFetchingAuth(false))
        if (messages[error.message]) {
            const msg = messages[error.message]
            dispatch(setIsErrorAuth({ error: true, msg }))
        } else {
            dispatch(setIsErrorAuth({ error: true, msg: error.message }))
        }
    }
}

export const thunkLogOut = (): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetchingAuth(true))
        const responseRegister = await axios.post(`/auth/`, {
            uid: null,
        })
        dispatch(setUid(responseRegister.data.uid))
        dispatch(setClearData())
        dispatch(setIsFetchingAuth(false))
    } catch (error) {
        dispatch(setIsFetchingAuth(false))
        if (messages[error.message]) {
            const msg = messages[error.message]
            dispatch(setIsErrorAuth({ error: true, msg }))
        } else {
            dispatch(setIsErrorAuth({ error: true, msg: error.message }))
        }
    }
}

export function setUid(uid: TUidType): SetUidActionType {
    return {
        type: SET_UID,
        uid,
    }
}
