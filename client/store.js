import { configureStore } from '@reduxjs/toolkit';
import plantsReducer from '../client/reducers/plantsReducer';

const store = configureStore({
  reducer: {
    plants: plantsReducer,
  },
});

export default store;
