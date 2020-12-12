import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./Slices";

const rootReducer = combineReducers(
	{
		user: UserSlice.reducer,
	}
);

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
	reducer: rootReducer,
});