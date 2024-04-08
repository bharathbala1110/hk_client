import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "../../services/authService.js";
import axios from "axios";
import { api } from "../../services/apiService";

const initialState = {
  baleDetail: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const baleDetailSlice = createSlice({
  name: "baleDetail",
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
        state.baleDetail = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.baleDetail= [];
      });
  },
});
export const getById = createAsyncThunk(
  "bale/getById",
  async (id, thunkAPI) => {
    try {
      const responseData = await api.get(`/bale/${id}`);
      console.log(responseData);
      return responseData.data;
      // return await authService.login(user);
    } catch (e) {
      const message = e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const { reset } = baleDetailSlice.actions;

export default baleDetailSlice.reducer;
