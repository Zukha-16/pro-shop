import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  userOrders: [],
  errorMessage: "",
  detailsStatus: "idle",
};

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, { getState }) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().user.user.token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.user = action.payload;
        state.errorMessage = "";
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.errorMessage = action.error.message;
      })
      .addDefaultCase((state) => {
        state.detailsStatus = "idle";
      });
  },
});

const { reducer } = userDetailsSlice;
export default reducer;
