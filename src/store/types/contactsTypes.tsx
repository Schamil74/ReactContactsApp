export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_DATA = 'SET_DATA'
export const SET_ITEM_DATA = 'SET_ITEM_DATA'
export const SET_CLEAR = 'SET_CLEAR'
export const SET_IS_ERROR = 'SET_IS_ERROR'

export type TItem = {
    id: number
    name: string
    email: string
    phone: string
}

export type IContacts = Array<TItem>

export interface IContactAppState {
    contacts: IContacts
}

export interface SetItemDataActionType {
    type: typeof SET_ITEM_DATA
    contacts: IContacts
}

export interface SetClearActionType {
    type: typeof SET_CLEAR
}

export type AppActionTypes = SetClearActionType | SetItemDataActionType

export type AppConstTypes = typeof SET_CLEAR | typeof SET_ITEM_DATA
