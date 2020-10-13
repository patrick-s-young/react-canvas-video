import type { ButtonConfig } from 'components/button.config';
import { numTilesAllPossibleValues } from 'features/mosaicCanvasVideo/mosaicSlice';

interface GetMosaicSelectorConfig {
  (): Array<ButtonConfig>
}

// instead of function store value in const
export const getMosaicSelectorConfig: GetMosaicSelectorConfig = () => {

  return numTilesAllPossibleValues.map(numTiles => {
    return {
      stateValue: numTiles,
      imagePath: {
        default: `/images/0${numTiles}_mosaic_selector_64x64_off.png`,
        hilite: `/images/0${numTiles}_mosaic_selector_64x64_on.png`
      },
      altText: `Click for ${numTiles}-tile video mosaic`
    }
  });
}
