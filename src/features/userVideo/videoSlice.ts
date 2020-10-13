import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VideoState {
  src: string | null
  duration: number | null
  width: number | null
  height: number | null
}

const initialState: VideoState = {
  src: null,
  duration: null,
  width: null,
  height: null
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoData (state, action: PayloadAction<VideoState>) {
      const { src, duration, width, height } = action.payload;
      state.src = src;
      state.duration = duration;
      state.width = width;
      state.height = height;
    }
  }
});

export const {
  setVideoData
} = videoSlice.actions;

export type SetVideoData = ReturnType<typeof setVideoData>;

export default videoSlice.reducer;