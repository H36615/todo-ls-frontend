import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
	signedIn: boolean,
	user: User | undefined,
}

interface User {
	username: string,
	tag: number,
}

export const setUserState = createAsyncThunk<UserState, UserState>(
	"users/fetchByIdStatus",
	async (loginInfo: UserState): Promise<UserState> => {
		return Promise.resolve(loginInfo);
	}
);

export const UserSlice = createSlice(
	{
		name: "user",
		initialState: { signedIn: false, user: { username: "", tag: 0 } },
		reducers: {},
		extraReducers: builder => {
			builder.addCase(setUserState.fulfilled, (state, action) => {
				state.signedIn = action.payload.signedIn;
				if (action.payload.user)
					state.user = action.payload.user;
			});
		}
	}
);