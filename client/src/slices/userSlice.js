import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userFromStorage,
  errorMessage: "",
  userStatus: "idle",
  userUpdateStatus: "idle",
};

export const userLogin = createAsyncThunk("user/login", async (userData) => {
  try {
    const { data } = await axios.post("/api/users/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
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
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { getState }) => {
    try {
      const { data } = await axios.put("/api/users/profile", userData, {
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

const actionFulfilled = (state, action) => {
  state.userStatus = "succeeded";
  state.user = action.payload;
  state.errorMessage = "";
  localStorage.setItem("user", JSON.stringify(action.payload));
};
const actionRejected = (state, action) => {
  state.userStatus = "failed";
  state.errorMessage = action.error.message;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    resetUpdateMessage: (state) => {
      state.userUpdateStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        actionFulfilled(state, action);
      })
      .addCase(userLogin.rejected, (state, action) => {
        actionRejected(state, action);
      })
      .addCase(userRegister.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        actionFulfilled(state, action);
      })
      .addCase(userRegister.rejected, (state, action) => {
        actionRejected(state, action);
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userUpdateStatus = "succeeded";
        state.user = action.payload;
        state.errorMessage = "";
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.userUpdateStatus = "failed";
        state.errorMessage = action.error.message;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = userSlice;
export const { userLogout, resetUpdateMessage } = actions;
export default reducer;
