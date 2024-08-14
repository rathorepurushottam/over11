import { authSlice } from '../slices/authSlice';
import { profileSlice } from '../slices/profileSlice';
import { homeSlice } from '../slices/homeSlice';
import { matchSlice } from '../slices/matchSlice';

const rootReducer = {
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  home: homeSlice.reducer,
  match: matchSlice.reducer,
};

export default rootReducer;
