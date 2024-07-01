import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUserService,
  logoutUserService,
  registerUserService,
  userDetailsService,
} from "../../services/userServices";

// reducer action for login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    try {
      return await loginUserService(email, password);
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

// reducer action for register user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password, phone }) => {
    try {
      const data = await registerUserService(name, email, password, phone);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

// reducer action for logout user
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    return await logoutUserService();
  } catch (e) {
    return null;
  }
});

// reducer action for gettting details of logged in user
export const userExist = createAsyncThunk("user/exists", async () => {
  try {
    return userDetailsService();
  } catch (e) {
    throw new Error(e.message);
  }
});

//initial state for user
const initialState = {
  user: null,
  loading: false,
  error: null,
};

//reducer slice for user
const userSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // reducer action states for user login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });

    // reducer action states for user register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });

    // reducer action states for user logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // reducer action states for user details
    builder.addCase(userExist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userExist.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(userExist.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
