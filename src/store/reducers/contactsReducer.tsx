import {
    AppActionTypes,
    IContactAppState,
    SET_CLEAR,
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
                ...state,
                contacts: [...action.contacts],
            }
        case SET_CLEAR:
            return {
                ...initialState,
            }

        default:
            return state
    }
}
