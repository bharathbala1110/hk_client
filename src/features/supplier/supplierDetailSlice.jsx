import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../../services/authService.js";
import axios from "axios";
import { api } from "../../services/apiService";

const initialState = {
  supplierDetail: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const supplierDetailSlice = createSlice({
  name: "supplierDetail",
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
    builder.addCase(getById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.supplierDetail = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.supplierDetail = [];
      });
  },
});
export const getById = createAsyncThunk(
  "supplier/getById",
  async (id, thunkAPI) => {
    try {
      const responseData = await api.get(`/supplier/${id}`);
      console.log(responseData);
      return responseData.data;
      // return await authService.login(user);
    } catch (e) {
      const message = e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const { reset } = supplierDetailSlice.actions;

export default supplierDetailSlice.reducer;
