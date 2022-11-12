import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {currencySlice} from "./currencySlice";
import {inputsSlice} from "./inputsSlice";

export const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
    inputs:inputsSlice.reducer

  }

  ,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
