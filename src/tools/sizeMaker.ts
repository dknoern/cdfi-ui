import { Size } from 'types/misc';

type SizeAdjuster = (sizes: Size) => Size;

type Config = {
  hasHeader?: boolean;
  hasActionLine?: boolean;
};
const defaultConfig: Config = {
  hasHeader: true,
  hasActionLine: true,
};
export const tablePageHeightAdjuster: (config?: Config) => SizeAdjuster = (
  config,
) => (sizes): Size => {
  const useConfig = config ?? defaultConfig;

  const hasHeader =
    typeof useConfig.hasHeader === 'undefined' || useConfig.hasHeader;
  const hasActionLine =
    typeof useConfig.hasActionLine === 'undefined' || useConfig.hasActionLine;

  // main header
  const el1 = hasHeader
    ? document.getElementById('PageSectionWrapper__header')?.offsetHeight ?? 0
    : 0;
  // action line (buttons etc.)
  const el2 = hasActionLine
    ? document.getElementById('ActionLine')?.offsetHeight ?? 0
    : 0;

  // 24 - top and bottom padding
  // 75 - main header
  // 44 - table header
  return {
    width: sizes.width,
    height: sizes.height - 75 - el1 - el2 - 24 * 2 - 44,
  };
};
