import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostsByUserId, getUserDetailsById } from "../firebase/methods";

const initialState = {
  userDetails: null,
  error: null,
  loading: false,
  userPosts: [],
};
export const fetchUserInfo = createAsyncThunk("user/fetch", async (id) => {
  const response = await getUserDetailsById(id);
  return response;
});
export const fetchUserPosts = createAsyncThunk(
  "user/posts/fetch",
  async (id) => {
    const response = await getPostsByUserId(id);
    return response;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
      console.log("inside setUser", action.payload);
    },
    updateUserProfile: (state, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
    },
    insertNewUserPost: (state, action) => {
      state.userPosts = [...state.userPosts, { ...action.payload }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = state.userDetails
          ? { ...state.userDetails, ...action.payload }
          : action.payload;
        console.log(action.payload);
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(fetchUserPosts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        (state.loading = false), (state.userPosts = action.payload);
        console.log(action.payload);
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export const { setUser, updateUserProfile, insertNewUserPost } =
  userSlice.actions;

export default userSlice.reducer;
