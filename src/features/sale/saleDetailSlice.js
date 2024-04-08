import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../../services/authService.js";
import axios from "axios";
import { api } from "../../services/apiService";

const initialState = {
  saleDetail: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const saleDetailSlice = createSlice({
  name: "saleDetail",
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
        state.saleDetail = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.saleDetail = [];
      });
  },
});
export const getById = createAsyncThunk(
  "sale/getById",
  async (id, thunkAPI) => {
    try {
      const responseData = await api.get(`/sale/${id}`);
      console.log(responseData);
      return responseData.data;
      // return await authService.login(user);
    } catch (e) {
      const message = e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const { reset } = saleDetailSlice.actions;

export default saleDetailSlice.reducer;
