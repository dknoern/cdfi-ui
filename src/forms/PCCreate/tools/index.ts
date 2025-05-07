import { FormStep } from '../types';
import { stepInfo } from '../constants';

export * from './storeData2SaveModel';
export * from './makeUploadRedirectLink';

export const stepIndexByKey = (key: FormStep): number =>
  stepInfo.findIndex((item) => item.key === key) as number;
