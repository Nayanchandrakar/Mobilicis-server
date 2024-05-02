export const serverUrl = (endpoint?: string): string => {
  const url = process?.env?.SERVER_URL as string;
  if (endpoint) {
    return url + endpoint;
  }
  return url;
};
