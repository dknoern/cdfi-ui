import { typography } from 'constants/typography';
import { FunctionTypes, FunctionTooltipsText } from '../types';

const {
  sumUsage,
  sumDescription,
  countUsage,
  countDescription,
  productUsage,
  productDescription,
  averageUsage,
  averageDescription,
  medianUsage,
  medianDescription,
  minUsage,
  minDescription,
  maxUsage,
  maxDescription,
} = typography('functionTooltips');

export const functionTooltipsText: FunctionTooltipsText = {
  [FunctionTypes.Sum]: {
    usage: sumUsage,
    description: sumDescription,
  },
  [FunctionTypes.Count]: {
    usage: countUsage,
    description: countDescription,
  },
  [FunctionTypes.Product]: {
    usage: productUsage,
    description: productDescription,
  },
  [FunctionTypes.Average]: {
    usage: averageUsage,
    description: averageDescription,
  },
  [FunctionTypes.Median]: {
    usage: medianUsage,
    description: medianDescription,
  },
  [FunctionTypes.Min]: {
    usage: minUsage,
    description: minDescription,
  },
  [FunctionTypes.Max]: {
    usage: maxUsage,
    description: maxDescription,
  },
};
