import { RequestData, RequestResult } from 'types/contactSupport';
import { apiProcessor, performRequest } from 'tools';
import { ManagerDefault } from './ManagerDefault';

export class FeedbackManager extends ManagerDefault {
  createSupportRequest = (formData: RequestData): Promise<RequestResult> => {
    const isLogged = 'userId' in formData;
    const endpointName = isLogged
      ? 'contactSupportRequestLogged'
      : 'contactSupportRequestNotLogged';
    return performRequest(endpointName, (operationName) =>
      apiProcessor.post(operationName, null, formData, isLogged),
    );
  };
}
