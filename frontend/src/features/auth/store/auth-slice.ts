// src/features/auth/store/auth-slice.ts

import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, User } from "../types/auth-types";

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        loginSuccess: (state) => {
            state.isAuthenticated = true;
            state.loading = false;
        },
        
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },

        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                };
            }
        },
    },
});

export const {
    setLoading,
    loginSuccess,
    logout,
    updateUser,
    setUser
} = authSlice.actions;

export default authSlice.reducer;