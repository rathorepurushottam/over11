import {createSlice} from '@reduxjs/toolkit';
import {appOperation} from '../appOperation';

export const initialState = {};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
});

export const {} = homeSlice.actions;
export const getSeriesData = () => async dispatch => {
  try {
    const res = await appOperation.customer.getSeriesData();
    console.log('response of getSeries Api', res);
  } catch (e) {
    console.log('error in series api', e);
  }
};
export default homeSlice.reducer;
