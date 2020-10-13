import { numTilesAllPossibleValues } from 'features/mosaicCanvasVideo/mosaicSlice';

interface GetInPoints {
  (duration: number): { [key: string] : Array<number> }
}

export const getInPoints: GetInPoints = (duration) => {
  const inPointsAll: { [key: string] : Array<number> } = {};

  numTilesAllPossibleValues.forEach(numTiles => { 
    const secondsIncrement = (duration - 2.0) / numTiles;
    const inPoints: Array<number> = [];
    for (let tileIndex = 0; tileIndex < numTiles; tileIndex++) {
      inPoints.push((tileIndex + 1) * secondsIncrement);
    }
    inPointsAll[numTiles] = inPoints;
  });

  return inPointsAll;
}