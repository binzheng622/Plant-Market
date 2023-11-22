import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  plantList: [],
};

const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {},
});

export const {} = plantSlice.actions;

export default plantSlice.reducer;
