export const checkResponseTypeIsJson = (response: Response): boolean => {
  const contentType = response.headers.get('content-type');

  return !!contentType && contentType.indexOf('application/json') > -1;
};
