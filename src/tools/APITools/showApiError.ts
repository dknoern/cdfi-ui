import { APIError } from 'types/apiError';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { prepareErrorMessage } from 'tools/APITools';

export const showAPIError =
  (defaultMessage: string, uiTextItem?: string) =>
  (errorObj: APIError['data']): void => {
    notifyUser.error(
      prepareErrorMessage(
        errorObj,
        uiTextItem ? uiText(defaultMessage, uiTextItem) : defaultMessage,
      ),
    );
  };
