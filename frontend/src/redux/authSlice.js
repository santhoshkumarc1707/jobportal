import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        token: null, // Token as a single string
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        settoken: (state, action) => {
            state.token = action.payload; // Directly assign payload
        },
    },
});

export const { setLoading, setUser, settoken } = authSlice.actions;
export default authSlice.reducer;
