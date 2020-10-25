import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducer } from './authReducer'
import { contactsReducer } from './contactsReducer'
import { fetchErrorReducer } from './fetchErrorReducer'

export const rootReducer = combineReducers({
    contactsReducer,
    authReducer,
    fetchErrorReducer,
})

let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export { store }
