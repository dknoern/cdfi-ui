export const extractJsonFromResponse = (response: Response): Promise<any> =>
  response.json().catch(() => null);
