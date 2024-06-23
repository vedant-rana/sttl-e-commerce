import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUserService,
  logoutUserService,
  registerUserService,
  userDetailsService,
} from "../../services/userServices";

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

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    return await logoutUserService();
  } catch (e) {
    return null;
  }
});

export const userExist = createAsyncThunk("user/exists", async () => {
  try {
    return userDetailsService();
  } catch (e) {
    return null;
  }
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

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
    builder.addCase(userExist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userExist.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(userExist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
