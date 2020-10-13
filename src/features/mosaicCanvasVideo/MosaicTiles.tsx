import { useEffect, useRef } from 'react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMosaicVideo } from 'features/mosaicCanvasVideo/mosaicSlice';
import { MosaicTile } from 'features/mosaicCanvasVideo/MosaicTile';
import 'features/mosaicCanvasVideo/mosaicStyles.css';
import type { RootState } from 'app/rootReducer';
import type { MosaicState } from 'features/mosaicCanvasVideo/mosaicSlice';
import type { VideoState } from 'features/userVideo/videoSlice';

const MosaicVideo: React.FC = () => {
  const dispatch = useDispatch();
  const animationFrameReq = useRef<number>(0);
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const { 
    numTiles, 
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
    console.log(`numTiles: ${numTiles}`)
    // use inPoint.length to determine if mosaicSlice has been initialized.
    // initialization occurs in useEffect[src]
    if (canvasRef.current !== null && inPoints[numTiles] !== undefined) {
    for (let idx = 0; idx < numTiles; idx++) {
      mosaicTiles.push(
        new MosaicTile(
          canvasRef.current.getContext('2d') as CanvasRenderingContext2D,
          inPoints[numTiles][idx],
          copyVideoFromArea[numTiles],
          drawToCanvasArea[numTiles][idx],
          tileAnimEvents[numTiles][idx],
          src as string
        )
      );
    }
    mosaicTiles[0].video.addEventListener('play', start);
  }
  }, [numTiles, inPoints, copyVideoFromArea, drawToCanvasArea, tileAnimEvents]);



  function start () {
    if (animationFrameReq.current !== 0) cancelAnimationFrame(animationFrameReq.current);
    
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
        mosaicTile.currentEventAction();
      });

      animationFrameReq.current = requestAnimationFrame(step);
    }
    animationFrameReq.current = requestAnimationFrame(step);
  }

  return(
		<div className='mosaic-container'>
      <canvas
        ref={canvasRef}
        width={width as number}
        height={height as number}
        style={{backgroundColor: '#eee'}}
      />
    </div>
  );
}

export default MosaicVideo;