import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/user/user.slice.js';
import sessionStorage from 'redux-persist/es/storage/session'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
const rootReducer = combineReducers({
    user: userReducer 
})

const persisConfig = {
    key: 'root',
    storage: sessionStorage
}

const persistedReducer = persistReducer(persisConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    (getDefaultMiddleware({ serializableCheck: false}))
   
})

export const persistor = persistStore(store)