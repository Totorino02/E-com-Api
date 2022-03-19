import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../../services/authService";
const user = localStorage.getItem('user')

const initialState = {
    user: user? user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isLoggedIn: false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register', 
    async(user, thunkApi)=>{
        try{
            return await authServices.register(user)
        }catch(error){
            return thunkApi.rejectWithValue("Veuillez réessayer erreur lors de l'inscription");
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkApi)=> {
        try{
            return await authServices.login(user);
        }catch(error){
            return thunkApi.rejectWithValue("Veuillez réessayer erreur lors de la connection")
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
            state.isLoggedIn = false;
            state.user = null;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(register.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected, (state, action)=>{
                state.isError = true;
                state.message = action.payload
            })
            .addCase(login.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state)=>{
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Connection reuissi avec Success !"
                state.user = localStorage.getItem('user');
                state.isLoggedIn = true;
            })
    }
});


export default authSlice.reducer;