import {
    FetchErrorActionTypes,
    IFetchErrorType,
    SET_IS_ERROR_AUTH,
    SET_IS_ERROR_DATA,
    SET_IS_FETCHING_AUTH,
    SET_IS_FETCHING_DATA,
    SET_THROW_MESSAGE,
} from '@/store/types/fetchErrorTypes'

const initialState: IFetchErrorType = {
    isFetchingAuth: true,
    isFetchingData: true,
    isErrorAuth: {
        error: false,
        msg: '',
    },
    isErrorData: {
        error: false,
        msg: '',
    },
    throwMessage: '',
}

export function fetchErrorReducer(
    state = initialState,
    action: FetchErrorActionTypes
): IFetchErrorType {
    switch (action.type) {
        case SET_IS_FETCHING_AUTH:
            return {
                ...state,
                isFetchingAuth: action.isFetchingAuth,
            }
        case SET_IS_FETCHING_DATA:
            return {
                ...state,
                isFetchingData: action.isFetchingData,
            }
        case SET_IS_ERROR_AUTH:
            return {
                ...state,
                isErrorAuth: {
                    error: action.isErrorAuth.error,
                    msg: action.isErrorAuth.msg,
                },
            }
        case SET_IS_ERROR_DATA:
            return {
                ...state,
                isErrorData: {
                    error: action.isErrorData.error,
                    msg: action.isErrorData.msg,
                },
            }
        case SET_THROW_MESSAGE:
            return {
                ...state,
                throwMessage: action.throwMessage,
            }
        default:
            return state
    }
}
