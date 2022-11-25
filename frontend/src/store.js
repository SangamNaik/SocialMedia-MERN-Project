import { configureStore } from '@reduxjs/toolkit';
import { myPostsReducer, postReducer, userPostsReducer } from './reducers/Post';
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from './reducers/User';

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    post: postReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
  },
});

export default store;
