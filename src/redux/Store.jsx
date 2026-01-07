import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist"


import userReducer from './slice/UserSlice';
import adminReducer from './slice/AdminSlice'


const authPersistConfig={
    key:'auth',
    storage
}

const adminPersistConfig={
    key:'admin',
    storage
}

const rootReducer=combineReducers({
    auth:persistReducer(authPersistConfig,userReducer),
    admin:persistReducer(adminPersistConfig,adminReducer)  
})


const Store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions:[
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/PAUSE",
                    "persist/FLUSH",
                     "persist/PURGE",
                    "persist/REGISTER",

                ],
            },
        }),
    
})

export const persistor=persistStore(Store)
export default Store
