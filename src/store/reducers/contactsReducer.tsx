import {
    AppActionTypes,
    IContactAppState,
    SET_ADD_CONTACT,
    SET_CLEAR,
    SET_DELETE_CONTACT,
    SET_ITEM_DATA,
} from '@/store/types/contactsTypes'

const initialState: IContactAppState = {
    contacts: [],
}

export function contactsReducer(
    state = initialState,
    action: AppActionTypes
): IContactAppState {
    switch (action.type) {
        case SET_ITEM_DATA:
            return {
                contacts: [...action.contacts],
            }
        case SET_CLEAR:
            return {
                ...initialState,
            }
        case SET_ADD_CONTACT:
            return {
                contacts: [...state.contacts, action.contact],
            }
        case SET_DELETE_CONTACT:
            return {
                contacts: [
                    ...state.contacts.filter(
                        contact => contact.id !== action.id
                    ),
                ],
            }
        default:
            return state
    }
}
