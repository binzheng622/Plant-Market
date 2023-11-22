import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  plantList: [],
};

const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {
    syncData: (state, action) => {
      state.username = action.payload.username;

      state.plantList = state.plantList.slice();
      state.plantList = action.payload.plantList;
    },
  },
});

export const { syncData } = plantSlice.actions;

export default plantSlice.reducer;
