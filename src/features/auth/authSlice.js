import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../../services/authService.js";
import axios from "axios";
import {api, setAuthToken} from "../../services/apiService";

// get user from local storage

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout:(state,action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      const l=localStorage.removeItem('user')
      state.user =l;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending,(state)=>{
        state.isLoading=true
    })
    .addCase(login.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.user=action.payload
        localStorage.setItem("user", JSON.stringify(action.payload));
        setAuthToken()
    })
    .addCase(login.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.user=null
    })
  },
});
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const responseData=await api.post('/user/login',user)
    console.log(responseData)
    
    return responseData.data;
    // return await authService.login(user);
  } catch (e) {
    const message = e.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const { reset,logout } = authSlice.actions;

export default authSlice.reducer;
