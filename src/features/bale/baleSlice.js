import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../../services/authService.js";
import axios from "axios";
import { api } from "../../services/apiService";

const initialState = {
  baleData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const baleSlice = createSlice({
  name: "bale",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.baleData = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.baleData = [];
      })
     
  },
});

export const getAll = createAsyncThunk(
  "bale/getAll",
  async (user, thunkAPI) => {
    try {
      const responseData = await api.get("/bale");
      console.log(responseData);
      return responseData.data;
      // return await authService.login(user);
    } catch (e) {
      const message = e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = baleSlice.actions;

export default baleSlice.reducer;
