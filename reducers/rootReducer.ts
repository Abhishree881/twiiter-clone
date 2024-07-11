// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
