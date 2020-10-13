import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { getMosaicSelectorConfig } from 'features/mosaicCanvasVideo/helpers';
import { setNumTiles } from 'features/mosaicCanvasVideo/mosaicSlice';
import type { NumTiles } from 'features/mosaicCanvasVideo/mosaicSlice';
import Button from 'components/Button';
import { v1 as uuid } from 'uuid';
import 'features/mosaicCanvasVideo/mosaicStyles.css';

const MosaicSelector: React.FC = () => {
  const dispatch = useDispatch();

  const { numTiles } = useSelector(
		( state: RootState ) => state.mosaic
	);
  const onClickHandler = (newStateValue: NumTiles) => {
    dispatch(setNumTiles(newStateValue));
  }

  return (
    <div className={'mosaicSelector-container'}>
      { getMosaicSelectorConfig().map((button) =>
          <Button 
            onClickCallback={onClickHandler}
            stateValue={button.stateValue}
            isEnabled={button.stateValue !== numTiles}
            imagePath={button.imagePath}
            className={'mosaiacSelector-button'}
            altText={button.altText}
            key={uuid()}
          />)
      }
    </div>
  );
}

export default MosaicSelector;


