export const SET_UID = 'SET_UID'

export type TUidType = string | null

export type IISFetching = boolean

export interface AuthType {
    uid: TUidType
}

export interface SetUidActionType {
    type: typeof SET_UID
    uid: TUidType
}

export type AuthConstTypes = typeof SET_UID
