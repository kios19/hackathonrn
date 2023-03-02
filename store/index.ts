import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"
import rootReducer from "./reducers"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)

const getPersistor = () => persistor


const getStore = () => store

const getState = () => {
    return store.getState()
}

export {
    getStore, getState, getPersistor
}

export default {
    getStore, getState, getPersistor
}