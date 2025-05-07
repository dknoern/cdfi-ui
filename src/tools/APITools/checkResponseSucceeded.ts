export const checkResponseSucceeded = (response: Response): boolean => {
  const { status } = response;

  return status >= 200 && status < 300;
};
