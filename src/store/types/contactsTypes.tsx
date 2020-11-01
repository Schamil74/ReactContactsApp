export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_DATA = 'SET_DATA'
export const SET_ITEM_DATA = 'SET_ITEM_DATA'
export const SET_CLEAR = 'SET_CLEAR'
export const SET_IS_ERROR = 'SET_IS_ERROR'
export const SET_DELETE_CONTACT = 'SET_DELETE_CONTACT'
export const SET_ADD_CONTACT = 'SET_ADD_CONTACT'
export const SET_UPDATE_CONTACT = 'SET_UPDATE_CONTACT'

export interface TItem {
    id: string
    name: string
    email: string
    phone: string
}

export interface TItemFull extends TItem {
    userId: string
}

export type IContacts = Array<TItemFull>

export interface IContactAppState {
    contacts: IContacts
}

export interface SetItemDataActionType {
    type: typeof SET_ITEM_DATA
    contacts: IContacts
}

export interface SetDeleteContactActionType {
    type: typeof SET_DELETE_CONTACT
    id: string
}

export interface SetAddContactActionType {
    type: typeof SET_ADD_CONTACT
    contact: TItemFull
}

export interface SetUpdateContactActionType {
    type: typeof SET_UPDATE_CONTACT
    contact: TItemFull
}

export interface SetClearActionType {
    type: typeof SET_CLEAR
}

export type AppActionTypes =
    | SetClearActionType
    | SetItemDataActionType
    | SetDeleteContactActionType
    | SetAddContactActionType
    | SetUpdateContactActionType

export type AppConstTypes =
    | typeof SET_CLEAR
    | typeof SET_ITEM_DATA
    | typeof SET_DELETE_CONTACT
    | typeof SET_ADD_CONTACT
    | typeof SET_UPDATE_CONTACT
