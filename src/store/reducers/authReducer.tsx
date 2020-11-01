import { AuthType, SetUidActionType, SET_UID } from '../types/authTypes'

const initialState: AuthType = {
    uid: null,
}

export function authReducer(
    state = initialState,
    action: SetUidActionType
): AuthType {
    switch (action.type) {
        case SET_UID:
            return {
                ...state,
                uid: action.uid,
            }

        default:
            return state
    }
}
