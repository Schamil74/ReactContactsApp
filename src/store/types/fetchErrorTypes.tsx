export const SET_IS_FETCHING_AUTH = 'SET_IS_FETCHING_AUTH'
export const SET_IS_FETCHING_DATA = 'SET_IS_FETCHING_DATA'
export const SET_IS_ERROR_AUTH = 'SET_IS_ERROR_AUTH'
export const SET_IS_ERROR_DATA = 'SET_IS_ERROR_DATA'
export const SET_THROW_MESSAGE = 'SET_THROW_MESSAGE'

export interface IIsErrorType {
    error: boolean
    msg: string
}

export type IISFetching = boolean

export interface IFetchErrorType {
    isFetchingAuth: IISFetching
    isFetchingData: IISFetching
    isErrorAuth: IIsErrorType
    isErrorData: IIsErrorType
    throwMessage: string
}

export interface SetIsFetcingAuthActionType {
    type: typeof SET_IS_FETCHING_AUTH
    isFetchingAuth: IISFetching
}

export interface SetIsFetcingDataActionType {
    type: typeof SET_IS_FETCHING_DATA
    isFetchingData: IISFetching
}

export interface SetIsErrorAuthActionType {
    type: typeof SET_IS_ERROR_AUTH
    isErrorAuth: IIsErrorType
}

export interface SetIsErrorDataActionType {
    type: typeof SET_IS_ERROR_DATA
    isErrorData: IIsErrorType
}

export interface SetThrowMessageActionType {
    type: typeof SET_THROW_MESSAGE
    throwMessage: string
}

export type FetchErrorActionTypes =
    | SetIsFetcingAuthActionType
    | SetIsFetcingDataActionType
    | SetIsErrorAuthActionType
    | SetIsErrorDataActionType
    | SetThrowMessageActionType

export type FetchErrorTypeConstTypes =
    | typeof SET_IS_FETCHING_AUTH
    | typeof SET_IS_FETCHING_DATA
    | typeof SET_IS_ERROR_AUTH
    | typeof SET_IS_ERROR_DATA
    | typeof SET_THROW_MESSAGE
