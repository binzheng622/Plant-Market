import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  id: 0,
  username: '',
  plantList: [],
};

const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {
    //update user info from database to redux store
    syncData: (state, action) => {
      state.id = action.payload.id;

      state.username = action.payload.username;

      state.plantList = state.plantList.slice();
      state.plantList = action.payload.plantList;
    },
  },
});

export const { syncData } = plantSlice.actions;

export default plantSlice.reducer;
