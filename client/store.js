import { configureStore } from '@reduxjs/toolkit';
import plantsReducer from './reducers/plantsReducer.js';

//redux store setup
const store = configureStore({
  reducer: {
    plants: plantsReducer,
  },
});

export default store;
