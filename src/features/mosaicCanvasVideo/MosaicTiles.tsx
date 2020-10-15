import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MosaicTile, MosaicSelector, setMosaicVideo, setNumTiles } from 'features/mosaicCanvasVideo';
import type { RootState } from 'app/rootReducer';
import type { MosaicState, NumTiles } from 'features/mosaicCanvasVideo';
import type { VideoState } from 'features/userVideo/videoSlice';
import 'features/mosaicCanvasVideo/mosaicStyles.css';

export const MosaicTiles: React.FC = () => {
  const dispatch = useDispatch();
  let animationFrameReq: number;
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const { 
    numTiles,
    canvasWidth, 
    inPoints, 
    copyVideoFromArea,
    drawToCanvasArea,
    tileAnimEvents } = useSelector<RootState, MosaicState>(
		(state) => state.mosaic
  );
  const { 
    src, 
    duration, 
    width, 
    height } = useSelector<RootState, VideoState>(
    (state) => state.video
  );

  const onClickHandler = (newStateValue: NumTiles) => {
    cancelAnimationFrame(animationFrameReq);
    mosaicTiles.forEach(tile => tile.clear());
    dispatch(setNumTiles(newStateValue));
  }
  let mosaicTiles: Array<MosaicTile> = [];
  // fifteen second video mosaic loop - move to config or slice
  const animationCycleDuration: number = 15000 

  useEffect(() => {
    // when new user video is uploaded, update mosaic video values
    if (src !== null) {
      dispatch(setMosaicVideo({ src, duration, width, height }));
    }
  }, [src]);

  useEffect(() => {
    if (canvasRef.current !== null && inPoints[numTiles] !== undefined) {
    for (let tileIndex = 0; tileIndex < numTiles; tileIndex++) {
      mosaicTiles.push(
        new MosaicTile(
          canvasRef.current.getContext('2d') as CanvasRenderingContext2D,
          inPoints[numTiles][tileIndex],
          copyVideoFromArea[numTiles],
          drawToCanvasArea[numTiles][tileIndex],
          tileAnimEvents[numTiles][tileIndex],
          src
        )
      );
    }
    setTimeout(() => {
      mosaicTiles.forEach(tile => tile.start());
      start()
    }, 500);
    //mosaicTiles[0].video.addEventListener('play', start);
  }
  }, [numTiles, inPoints, copyVideoFromArea, drawToCanvasArea, tileAnimEvents]);



  function start () {
    
    const context = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
    let beginTime = performance.now();

    function step(timeStamp: DOMHighResTimeStamp) {
      let elapsedTime = timeStamp - beginTime;

      if (elapsedTime > animationCycleDuration) {
        beginTime = performance.now();
        elapsedTime = 0;
        mosaicTiles.forEach((tile) => tile.resetEvents());
      }

      mosaicTiles.forEach((mosaicTile) => {
        if (elapsedTime > mosaicTile.nextEventTime) {
          mosaicTile.updateEvent();
        }
        //context.clearRect(0, 0, canvasWidth, canvasWidth);
        mosaicTile.currentEventAction();
      });

      animationFrameReq = requestAnimationFrame(step);
    }
    animationFrameReq = requestAnimationFrame(step);
  }

  return(
    <>
		<div className='mosaicTiles-canvasContainer'>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasWidth}
        style={{backgroundColor: '#eee'}}
      />
    </div>
    <MosaicSelector
      onClickHandler={onClickHandler}/>
    </>
  );
}
