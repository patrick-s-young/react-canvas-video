import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoData } from 'features/userVideo/videoSlice';
import { MosaicTiles, setMosaicCanvas } from 'features/mosaicCanvasVideo';
import { loadVideoMetadata, preloadVideo} from 'utils';
import type { VideoState } from 'features/userVideo/videoSlice';
import type { RootState } from 'app/rootReducer';
import type { VideoMetadata } from 'utils';
import 'app/app.css';

const App: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);
	const dispatch = useDispatch();
	const { src, width } = useSelector<RootState, VideoState>(
		(state) => state.video
	);
  const { canvasWidth } = useSelector(
		( state: RootState ) => state.mosaic
	);

	const onSetVideoData = (videoMetadata: VideoMetadata) =>
		dispatch(setVideoData({
			src: videoSrc,
			duration: videoMetadata.duration,
			width: videoMetadata.videoWidth,
			height: videoMetadata.videoHeight
		})
	);

	const onSetMosaicCanvas = (videoWidth: number) => {
		const canvasWidth = videoWidth > window.innerWidth ? window.innerWidth : videoWidth;
		dispatch(setMosaicCanvas(canvasWidth));
	}

	useEffect(() => {
		// placeholder for user file upload functionality
		preloadVideo('video/swing_480x480.mp4')
		.then(setVideoSrc)
		.catch(setError);
	}, []);

	useEffect(() => {
		// retrieve video metadata
		if (videoSrc !== null) {
    	loadVideoMetadata(videoSrc, 2000)
      	.then(onSetVideoData)
				.catch(setError);
		}
  }, [videoSrc]);

	useEffect(() => {
		if (width !== null) {
			onSetMosaicCanvas(width);
		}
	}, [width]);

	return (
			<div className='app-container'>
      	{src !== null &&
					<div style={{width: `${canvasWidth}px`}}>
						<MosaicTiles />
					</div>
				}
				{src === null && <div>LOADING...</div>}
      	{error !== null && <div>{error}</div>}
			</div>
	);
}
			
export default App;