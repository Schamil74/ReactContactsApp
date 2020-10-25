import {
    IIsErrorType,
    SetIsErrorAuthActionType,
    SetIsErrorDataActionType,
    SetIsFetcingAuthActionType,
    SetIsFetcingDataActionType,
    SetThrowMessageActionType,
    SET_IS_ERROR_AUTH,
    SET_IS_ERROR_DATA,
    SET_IS_FETCHING_AUTH,
    SET_IS_FETCHING_DATA,
    SET_THROW_MESSAGE,
} from '@/store/types/fetchErrorTypes'

export const setIsFetchingAuth = (
    isFetchingAuth: boolean
): SetIsFetcingAuthActionType => {
    return { type: SET_IS_FETCHING_AUTH, isFetchingAuth }
}

export const setIsFetchingData = (
    isFetchingData: boolean
): SetIsFetcingDataActionType => {
    return { type: SET_IS_FETCHING_DATA, isFetchingData }
}

export const setIsErrorAuth = (
    isErrorAuth: IIsErrorType
): SetIsErrorAuthActionType => {
    return { type: SET_IS_ERROR_AUTH, isErrorAuth }
}

export const setIsErrorData = (
    isErrorData: IIsErrorType
): SetIsErrorDataActionType => {
    return { type: SET_IS_ERROR_DATA, isErrorData }
}

export const setThrowMessage = (
    throwMessage: string
): SetThrowMessageActionType => {
    return { type: SET_THROW_MESSAGE, throwMessage }
}
