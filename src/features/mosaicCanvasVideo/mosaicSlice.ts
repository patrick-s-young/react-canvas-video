import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { VideoState } from 'features/userVideo/videoSlice';
import {
  getInPoints,
  getTileAnimEvents,
  getDrawToCanvasArea,
  getCopyVideoFromArea
}  from 'features/mosaicCanvasVideo/helpers';


export type NumTiles = 2 | 3 | 4 | 6 | 9;
// export const numTilesAllPossibleValues to read outside react component
// used for initializing mosaic video tile values when user video is uploaded.
export const numTilesAllPossibleValues: Array<NumTiles> = [2, 3, 4, 6, 9];
const numTilesDefault: NumTiles = 4;

export interface MosaicState {
  numTiles: number,
  inPoints: { [key: string] : Array<number> },
  copyVideoFromArea: { [index: string] : { x: number, y: number, width: number, height: number }},
  drawToCanvasArea: { [key: string] : Array<{ x: number, y: number, width: number, height: number }> },
  tileAnimEvents: { [index: string] : Array<Array<{ time: number, action: string }>> }
}

const initialState: MosaicState = {
  numTiles: numTilesDefault,
  inPoints: {},
  copyVideoFromArea: { 0: {x: 0, y: 0, width: 0, height: 0}},
  drawToCanvasArea: {},
  tileAnimEvents: {}
}

const mosaicSlice = createSlice({
  name: 'mosaic',
  initialState,
  reducers: {
    setMosaicVideo (state, action: PayloadAction<VideoState>) {
      const { duration, width, height } = action.payload;
      if (duration && width && height) {
        state.inPoints = getInPoints(duration);
        state.copyVideoFromArea = getCopyVideoFromArea(width, height);
        state.drawToCanvasArea = getDrawToCanvasArea(width, height);
        state.tileAnimEvents = getTileAnimEvents();
      }
    },
    setNumTiles (state, action: PayloadAction<NumTiles>) {
      const numTiles = action.payload;
      state.numTiles = numTiles;
    }
  }
});

export const {
  setMosaicVideo,
  setNumTiles
} = mosaicSlice.actions;

export type SetMosaicVideo = ReturnType<typeof setMosaicVideo>;

export default mosaicSlice.reducer;