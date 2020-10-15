import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';
import type { NumTiles } from 'features/mosaicCanvasVideo';
import { getMosaicSelectorConfig } from 'features/mosaicCanvasVideo/helpers';
import Button from 'components/Button';
import { v1 as uuid } from 'uuid';
import 'features/mosaicCanvasVideo/mosaicStyles.css';

export interface MosaicSelectorProps {
  onClickHandler: (newStateValue: NumTiles) => void
}

export const MosaicSelector: React.FC<MosaicSelectorProps> = ({ onClickHandler }) => {
  const { numTiles } = useSelector(
		( state: RootState ) => state.mosaic
  );

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




