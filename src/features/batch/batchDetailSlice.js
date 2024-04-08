import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../../services/authService.js";
import axios from "axios";
import { api } from "../../services/apiService";

const initialState = {
  batchDetail: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const batchDetailSlice = createSlice({
  name: "batchDetail",
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
        state.batchDetail = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.batchDetail = [];
      });
  },
});
export const getById = createAsyncThunk(
  "batch/getById",
  async (id, thunkAPI) => {
    try {
      const responseData = await api.get(`/batch/${id}`);
      console.log(responseData);
      return responseData.data;
      // return await authService.login(user);
    } catch (e) {
      const message = e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const { reset } = batchDetailSlice.actions;

export default batchDetailSlice.reducer;
