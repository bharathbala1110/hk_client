import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../../services/authService.js";
import axios from "axios";
import { api } from "../../services/apiService";

const initialState = {
  purchaseData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const purchaseSlice = createSlice({
  name: "purchase",
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
        state.purchaseData = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.purchaseData = [];
      })
     
  },
});

export const getAll = createAsyncThunk(
  "purchase/getAll",
  async (_, thunkAPI) => {
    try {
      const responseData = await api.get("/purchase");
      console.log(responseData.data);
      const data = Array.isArray(responseData.data) ? responseData.data : [];
      return data;
      // return await authService.login(user);
    } catch (e) {
      const message = e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = purchaseSlice.actions;

export default purchaseSlice.reducer;
