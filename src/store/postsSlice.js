import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../firebase/methods";

const initialState = {
  posts: [],
  error: null,
  loading: false,
};

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const response = getPosts();
  return response;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateLikes: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          let copyPost = { ...post };
          copyPost.likes = action.payload.likes;
          return copyPost;
        }
        return post;
      });
    },
    insertNewPost: (state, action) => {
      state.posts = [{ ...action.payload }, ...state.posts];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});
export const { updateLikes, insertNewPost } = postsSlice.actions;
export default postsSlice.reducer;
