import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setVideoData } from 'features/userVideo/videoSlice';
import loadVideoMetadata from 'utils/loadVideoMetadata';
import MosaicTiles from 'features/mosaicCanvasVideo/MosaicTiles';
import MosaicSelector from 'features/mosaicCanvasVideo/MosaicSelector';
import type { RootState } from 'app/rootReducer';
import type { VideoState } from 'features/userVideo/videoSlice';
import type { VideoMetadata } from 'utils/loadVideoMetadata';
import 'app/app.css';

const App: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);
	const dispatch = useDispatch();
	const { src } = useSelector<RootState, VideoState>(
		(state) => state.video
  );

	const onSetVideoData = (videoMetadata: VideoMetadata) =>
		dispatch(setVideoData({
			src: videoSrc,
			duration: videoMetadata.duration,
			width: videoMetadata.videoWidth,
			height: videoMetadata.videoHeight
		})
	);

	useEffect(() => {
		// placeholder for user file upload functionality
		setVideoSrc("video/swing.mp4");
	}, []);

	useEffect(() => {
		// retrieve video metadata
		if (videoSrc !== null) {
    	loadVideoMetadata(videoSrc, 2000)
      	.then(onSetVideoData)
				.catch(setError);
		}
  }, [videoSrc]);

	
	return (
			<div className='app-container' style={{width: '480px'}}>
      	{src !== null &&
					<div>
						<MosaicTiles />
						<MosaicSelector />
					</div>
				}
      	{error !== null && <div>{error}</div>}
			</div>
	);
}
			
export default App;