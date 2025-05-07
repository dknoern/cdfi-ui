import { apiProcessor } from 'tools/apiProcessor';
import {
  DocumentType,
} from '../../types';

export const getDocumentTypes = (cdfiId?: number): Promise<DocumentType[]> => {
  return apiProcessor.get('documentTypes', cdfiId);
};