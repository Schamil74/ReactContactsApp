import { rootReducer } from '@/store/reducers'
import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AuthConstTypes, SetUidActionType } from './authTypes'
import { AppActionTypes, AppConstTypes } from './contactsTypes'
import {
    FetchErrorActionTypes,
    FetchErrorTypeConstTypes,
} from './fetchErrorTypes'

type ActionTypes = AppActionTypes | SetUidActionType | FetchErrorActionTypes
type ActionConstTypes =
    | AuthConstTypes
    | AppConstTypes
    | FetchErrorTypeConstTypes
export type RootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<
    RootState,
    any,
    Action<ActionTypes>
>

export type AppThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<ActionConstTypes>
>
