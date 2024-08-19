import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {isAuthenicated: false, user: null},
    reducers: {
        login(state, action){
            state.isAuthenicated = true;
            state.user = action.payload.data
        },
        logout(state){
            state.isAuthenicated = false;
            state.user = null
        },
        userUpdate(state, action){
            state.user = action.payload.data
        }

    }
})

export const authActions = authSlice.actions;

export default authSlice
