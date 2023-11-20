import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'example',
  plantList: [
    {
      plantName: 'Cactus',
      plantImage:
        'https://www.thespruce.com/thmb/1Jrr-4FiyWM7fgfhIa46Jev644I=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/peanut-cactus-profile-5181579-hero-b8e88018fb5d43ab9614e978ba56afa6.jpg',
      plantWater: 'Average',
      plantSun: 'Part Sun/Part Shade',
    },
  ],
};

const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {},
});
