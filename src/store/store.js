import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          "user.userDetails.proactiveRefresh",
          "posts.proactiveRefresh",
        ],
      },
    }),
});
