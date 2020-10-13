import { combineReducers } from '@reduxjs/toolkit';
import videoReducer from 'features/userVideo/videoSlice';
import mosiacSlice from 'features/mosaicCanvasVideo/mosaicSlice';

const rootReducer = combineReducers({
  video: videoReducer,
  mosaic: mosiacSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;