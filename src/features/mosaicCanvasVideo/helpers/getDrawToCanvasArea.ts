import { numTilesAllPossibleValues } from 'features/mosaicCanvasVideo/mosaicSlice';

interface GetDrawToCanvasArea {
  (videoWidth: number, videoHeight: number): { [key: string] : Array<{ x: number, y: number, width: number, height: number }> }
} 

export const getDrawToCanvasArea: GetDrawToCanvasArea = (videoWidth, videoHeight) => {
  const drawToCanvasArea: { [key: string] : Array<{ x: number, y: number, width: number, height: number }> } = {};

  const tileSize: { [key: string] : {width: number, height: number } } = {
    2: { width: videoWidth / 2, height: videoHeight},
    3: { width: videoWidth / 3, height: videoHeight},
    4: { width: videoWidth / 2, height: videoHeight / 2 },
    6: { width: videoWidth / 3, height: videoHeight / 2 },
    9: { width: videoWidth / 3, height: videoHeight / 3 }
  }

  numTilesAllPossibleValues.forEach(numTiles => { 
    drawToCanvasArea[numTiles] = rowCol[numTiles].map(({ row, col }) => {
      return {
        x: col * tileSize[numTiles].width, 
        y: row * tileSize[numTiles].height, 
        width: tileSize[numTiles].width, 
        height: tileSize[numTiles].height       
      }})
    });

  return drawToCanvasArea;
}


// hard coded values can be calculated for less verbosity
const rowCol: { [index: string] : Array<{row: number, col: number}> } = {
  2:[
      {row: 0, col: 0},
      {row: 0, col: 1}
    ],
  3:[
      {row: 0, col: 0},
      {row: 0, col: 1},
      {row: 0, col: 2}
    ],
  4:[
      {row: 0, col: 0},
      {row: 0, col: 1},
      {row: 1, col: 0},
      {row: 1, col: 1}
    ],
  6:[
      {row: 0, col: 0},
      {row: 0, col: 1},
      {row: 0, col: 2},
      {row: 1, col: 0},
      {row: 1, col: 1},
      {row: 1, col: 2}
    ],
  9:[
      {row: 0, col: 0},
      {row: 0, col: 1},
      {row: 0, col: 2},
      {row: 1, col: 0},
      {row: 1, col: 1},
      {row: 1, col: 2},
      {row: 2, col: 0},
      {row: 2, col: 1},
      {row: 2, col: 2}
    ]
}