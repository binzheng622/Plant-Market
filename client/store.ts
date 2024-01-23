import { configureStore } from '@reduxjs/toolkit';
import plantsReducer from './reducers/plantsReducer';

//redux store setup
export const store = configureStore({
  reducer: {
    plants: plantsReducer,
  },
});
