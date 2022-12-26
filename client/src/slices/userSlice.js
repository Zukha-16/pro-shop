import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userFromStorage,
  errorMessage: "",
  userStatus: "idle",
};

export const userLogin = createAsyncThunk("user/login", async (userData) => {
  try {
    const { data } = await axios.post("/api/users/login", userData, {
      "Content-Type": "application/json",
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData) => {
    try {
      const { data } = await axios.post("/api/users", userData, {
        "Content-Type": "application/json",
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.user = action.payload;
        state.errorMessage = "";
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userStatus = "failed";
        state.errorMessage = action.error.message;
      })
      .addCase(userRegister.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.user = action.payload;
        state.errorMessage = "";
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.userStatus = "failed";
        state.errorMessage = action.error.message;
      })
      .addDefaultCase((state) => {
        state.userStatus = "idle";
      });
  },
});

const { actions, reducer } = userSlice;
export const { userLogout } = actions;
export default reducer;
