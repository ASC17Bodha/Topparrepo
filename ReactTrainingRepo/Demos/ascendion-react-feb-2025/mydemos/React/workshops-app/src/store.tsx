import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch,UseSelector,useSelector } from 'react-redux';

import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./features/themeSlice";

 const store = configureStore({
    // we are combing the slice reducers to create a single root reducer
    reducer: {
        // keyForTheSlice: reducerFromTheSlice
        theme: themeReducer,
        // usePreferences: userPeferencesReducer
    },
});

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export default store;