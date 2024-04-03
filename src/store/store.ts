import {configureStore, combineReducers} from "@reduxjs/toolkit";
import orderReducer from './reducers/OrderSlice'

const rootReducer = combineReducers({
    orderReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']