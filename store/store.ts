// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import rootReducer from '@/reducers/rootReducer';
import { thunk } from 'redux-thunk'

const store = configureStore({
  reducer: rootReducer,
});

export default store;
