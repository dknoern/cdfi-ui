import { useContext } from 'react';
import { Size } from 'types/misc';
import WindowSizeStore from 'store/windowSizeStore';

export const useWindowSize = (adjusterFn?: (sizes: Size) => Size): Size => {
  const { sizes } = useContext(WindowSizeStore);

  return adjusterFn ? adjusterFn(sizes) : sizes;
};
